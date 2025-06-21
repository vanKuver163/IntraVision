namespace backend.Services;

public interface IStateService
{
    bool TryAcquireLock(string userId);
    void ReleaseLock(string userId);
    bool IsMachineBusy();
}