namespace backend.Services;

public interface ITransactionManager
{
    Task<ITransaction> BeginTransactionAsync();
    Task<T> ExecuteTransactionAsync<T>(Func<Task<T>> action);
}

public interface ITransaction : IAsyncDisposable
{
    Task CommitAsync();
    Task RollbackAsync();
}