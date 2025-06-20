using backend.DTOs;
using backend.Mapper;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController(
    ICoinService coinService,
    IOrderService orderService,
    ITransactionManager transactionManager,
    ILogger<PaymentController> logger) : ControllerBase
{
    [HttpGet]
    [Route("coins")]
    public async Task<ActionResult<IEnumerable<CoinsResponse>>> GetCoins()
    {
        try
        {
            var coins = await coinService.GetCoinsAsync();
            var coinsResponse = CoinsMapper.ToResponse(coins);
            return Ok(coinsResponse);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при получении монет ");
            return StatusCode(500, "Произошла ошибка на сервере");
        }
    }

    [HttpPost]
    [Route("process")]
    public async Task<ActionResult<PaymentResponse>> ProcessPayment([FromBody] PaymentRequest request)
    {
        try
        {
            decimal paymentAmount = request.Payment.Sum(c => c.Coin.Denomination * c.Quantity);
            decimal orderAmount = request.Order.Sum(p => p.Product.Price * p.Quantity);
            decimal changeAmount = paymentAmount - orderAmount;

            var result = await transactionManager.ExecuteTransactionAsync(
                async () =>
                {
                    var updateResult = await coinService.UpdateCoinAmountsAsync(
                        CoinsMapper.ToRequest(request.Payment));

                    if (!updateResult.SuccessResult)
                        return new PaymentResponse(false, []);

                    var changeResult = await coinService.CalculateChange(changeAmount);
                    if (!changeResult.SuccessResult || changeResult.Data == null)
                        return new PaymentResponse(false, []);

                    var deductResult = await coinService.DeductCoinsAsync(
                        CoinsMapper.ToRequest(changeResult.Data));

                    if (!deductResult.SuccessResult)
                        return new PaymentResponse(false, []);

                    var orderResult = await orderService.AddOrderAsync(
                        request.Order, orderAmount);

                    if (!orderResult.SuccessResult)
                        return new PaymentResponse(false, []);

                    return new PaymentResponse(true, changeResult.Data);
                }
            );

            return Ok(result);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка оплаты товара ");
            return StatusCode(500, new PaymentResponse(
                false,
                []
            ));
        }
    }
}
