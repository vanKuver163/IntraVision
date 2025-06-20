namespace backend.Utils;

public class OperationResult
{
    public bool SuccessResult { get; }
    public string? ErrorMessage { get; }
    
    protected OperationResult(bool success, string? errorMessage)
    {
        SuccessResult = success;
        ErrorMessage = errorMessage;
    }
    
    public static OperationResult Success() => new(true, null);
    public static OperationResult Fail(string error) => new(false, error);
}

public class OperationResult<T> : OperationResult
{
    public T? Data { get; }
    
    private OperationResult(bool success, T? data, string? errorMessage) 
        : base(success, errorMessage)
    {
        Data = data;
    }
    
    public static OperationResult<T> Success(T? data) => new(true, data, null);
    public new static OperationResult<T> Fail(string error) => new(false, default, error);
}