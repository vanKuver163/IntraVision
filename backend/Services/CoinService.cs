using backend.Models;
using backend.Repository;

namespace backend.Services;

public class CoinService(IRepository<Coin> repository) : ICoinService
{
    public async Task<IEnumerable<Coin>> GetCoinsDenominationAsync() => await repository.GetAllAsync();
}