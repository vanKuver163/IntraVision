using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController(IProductService productService, ILogger<ProductController> logger) : ControllerBase
{
    [HttpPut]
    [Route("update-quantity")]
    public async Task<ActionResult<PaymentResponse>> UpdateQuantityProduct(
        [FromBody] UpdateProductQuantityRequest request)
    {
        try
        {
            var product = await productService.UpdateQuantityProduct(
                request.Quantity, 
                request.ProductId, 
                request.ProductName);
        
            return Ok(product);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при обновлении количества продукта");
            return StatusCode(500, "Произошла ошибка на сервере");
        }
    }
}