using backend.DTOs;
using backend.Models;
using backend.Utils;

namespace backend.Services;

public interface ICoinService
{
    Task<IEnumerable<Coin>> GetCoinsAsync();
    Task<OperationResult> UpdateCoinAmountsAsync(Coin[] receivedCoins);
    Task<OperationResult> DeductCoinsAsync(Coin[] coinsToDeduct);
    Task<OperationResult<List<CoinItem>>> CalculateChange(decimal amount);
}