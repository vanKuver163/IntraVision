using backend.DTOs;
using backend.Models;

namespace backend.Mapper;

public static class CoinsMapper
{
    public static CoinsResponse[] ToResponse(IEnumerable<Coin> coins) => coins.Select(c => new CoinsResponse(c.Id, c.Denomination)).ToArray();
}