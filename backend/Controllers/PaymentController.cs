using backend.DTOs;
using backend.Mapper;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PaymentController(ICoinService coinService, ILogger<PaymentController> logger) : ControllerBase
{
    [HttpGet]
    [Route("coins")]
    public async Task<ActionResult<IEnumerable<CoinsResponse>>> GetCoins()
    {
        try
        {
            var coins = await coinService.GetCoinsDenominationAsync();
            var coinsResponse = CoinsMapper.ToResponse(coins);
            return Ok(coinsResponse);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при получении монет ");
            return StatusCode(500, "Произошла ошибка на сервере");
        }
    }
}