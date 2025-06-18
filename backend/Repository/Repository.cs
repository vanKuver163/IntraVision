using System.Linq.Expressions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class Repository<T>(IDbContextFactory<ApplicationDbContext> dbContextFactory) : IRepository<T> where T : class
{
    public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, params Expression<Func<T, object>>[] includes)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        var query = context.Set<T>().AsQueryable();
        
        if (filter is not null)
        {
            query = query.Where(filter);
        }

        if (orderBy is not null)
        {
            query = orderBy(query);
        }

        query = includes.Aggregate(query, (current, include) => current.Include(include));
        return await query.ToListAsync();
    }

    public async Task AddAsync(T entity)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        await context.Set<T>().AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        context.Set<T>().Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        var entity = await context.FindAsync<T>(id);
        if (entity is not null)
        {
            context.Set<T>().Remove(entity);
        }
        await context.SaveChangesAsync();
    }

    public async  Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
    {
        await using var context = await dbContextFactory.CreateDbContextAsync();
        return await context.Set<T>().FirstOrDefaultAsync(predicate);
    }
}