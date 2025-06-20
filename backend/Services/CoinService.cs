using backend.DTOs;
using backend.Models;
using backend.Repository;
using backend.Utils;

namespace backend.Services;

public class CoinService(IRepository<Coin> repository, ILogger<CoinService> logger) : ICoinService
{
    public async Task<IEnumerable<Coin>> GetCoinsAsync() => await repository.GetAllAsync( orderBy: q => q.OrderBy(c => c.Denomination));

    public async Task<OperationResult> UpdateCoinAmountsAsync(Coin[] receivedCoins)
    {
        try
        {
            var existingCoins = (await repository.GetAllAsync(
                c => receivedCoins.Select(x => x.Id).Contains(c.Id))).ToList();

            foreach (var coin in existingCoins)
            {
                var update = receivedCoins.First(c => c.Id == coin.Id);
                coin.Amount += update.Amount;
            }

            await repository.UpdateRangeAsync(existingCoins);
            return OperationResult.Success();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка добавления монет в базу данных");
            return OperationResult.Fail("Ошибка добавления монет");
        }
    }

    public async Task<OperationResult> DeductCoinsAsync(Coin[] coinsToDeduct)
    {
        try
        {
            var existingCoins = (await repository.GetAllAsync(
                c => coinsToDeduct.Select(x => x.Id).Contains(c.Id))).ToList();

            foreach (var coin in existingCoins)
            {
                var deductAmount = coinsToDeduct.First(c => c.Id == coin.Id).Amount;
                coin.Amount -= deductAmount;
            }

            await repository.UpdateRangeAsync(existingCoins);
            return OperationResult.Success();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка списания монет из базы данных");
            return OperationResult<Coin>.Fail("Ошибка списания монет");
        }
    }

    public async Task<OperationResult<List<CoinItem>>> CalculateChange(decimal amount)
    {
        try
        {
            var availableCoins = await GetCoinsAsync();

            var sortedCoins = availableCoins
                .Where(c => c.Amount > 0)
                .OrderByDescending(c => c.Denomination)
                .ToList();

            decimal remaining = amount;
            var change = new List<CoinItem>();

            foreach (var coin in sortedCoins)
            {
                if (remaining <= 0) break;

                int needed = (int)(remaining / coin.Denomination);
                int available = coin.Amount;
                int taken = Math.Min(needed, available);

                if (taken > 0)
                {
                    change.Add(new CoinItem(new CoinsResponse(coin.Id, coin.Denomination), taken));
                    remaining -= taken * coin.Denomination;
                }
            }

            if (remaining > 0)
            {
                return OperationResult<List<CoinItem>>.Success(null);
            }

            return OperationResult<List<CoinItem>>.Success(change);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка выдачи сдачи");
            return OperationResult<List<CoinItem>>.Fail("Ошибка выдачи сдачи");
        }
    }
}