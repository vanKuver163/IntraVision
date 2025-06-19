using backend.Models;

namespace backend.Services;

public interface ICoinService
{
    Task<IEnumerable<Coin>> GetCoinsDenominationAsync();
}