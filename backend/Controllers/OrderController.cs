using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController(IOrderService orderService, ILogger<HomeController> logger) : ControllerBase
{
    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        try
        {
            var orders = await orderService.GetOrdersAsync();
            return Ok(orders);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при получении заказов ");
            return StatusCode(500, "Произошла ошибка на сервере");
        }
    }
}