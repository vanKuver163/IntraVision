using backend.DTOs;
using backend.Models;

namespace backend.Mapper;

public static class CoinsMapper
{
    public static CoinsResponse[] ToResponse(IEnumerable<Coin> coins) => coins.Select(c => new CoinsResponse(c.Id, c.Denomination)).ToArray();
    public static Coin[] ToRequest(IEnumerable<CoinItem> coinItems) => coinItems.Select(c => new Coin{Id = c.Coin.Id, Denomination = c.Coin.Denomination, Amount = c.Quantity}).ToArray();
}