using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace backend.Services;

public class EfTransactionManager(IDbContextFactory<ApplicationDbContext> dbContextFactory, ILogger<EfTransactionManager> logger) : ITransactionManager
{
    public async Task<ITransaction> BeginTransactionAsync()
    {
        var context = await dbContextFactory.CreateDbContextAsync();
        var transaction = await context.Database.BeginTransactionAsync();
        return new EfTransaction(context, transaction);
    }
    
    public async Task<T> ExecuteTransactionAsync<T>(Func<Task<T>> action)
    {
        await using var transaction = await BeginTransactionAsync();
        try
        {
            var result = await action();
            await transaction.CommitAsync();
            return result;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            logger.LogError(ex, "Transaction failed");
            throw; 
        }
    }
    
    private class EfTransaction(ApplicationDbContext context, IDbContextTransaction transaction)
        : ITransaction
    {
        public async Task CommitAsync()
        {
            await context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        
        public Task RollbackAsync() => transaction.RollbackAsync();
        
        public async ValueTask DisposeAsync()
        {
            await transaction.DisposeAsync();
            await context.DisposeAsync();
        }
    }
}