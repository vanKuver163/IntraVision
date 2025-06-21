namespace backend.Services;

public class StateService : IStateService
{
    private string? _currentUserId = null;
    private DateTime? _lockTime = null;
    private readonly object _lock = new object();
    
    public bool TryAcquireLock(string userId)
    {
        lock (_lock)
        {
            if (_currentUserId == null || _currentUserId == userId)
            {
                _currentUserId = userId;
                _lockTime = DateTime.UtcNow;
                return true;
            }
        
            if (DateTime.UtcNow - _lockTime > TimeSpan.FromMinutes(5))
            {
                _currentUserId = userId;
                _lockTime = DateTime.UtcNow;
                return true;
            }
            
            return false;
        }
    }
    
    public void ReleaseLock(string userId)
    {
        lock (_lock)
        {
            if (_currentUserId == userId)
            {
                _currentUserId = null;
                _lockTime = null;
            }
        }
    }
    
    public bool IsMachineBusy()
    {
        lock (_lock)
        {
            return _currentUserId != null;
        }
    }
}