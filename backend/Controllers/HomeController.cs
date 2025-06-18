using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController(IBrandService brandService, IProductService productService, ILogger<HomeController> logger) : ControllerBase
{
    [HttpGet]
    [Route("brands")]
    public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
    {
        try
        {
           var brands = await brandService.GetBrandsAsync();
           return Ok(brands);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при получении брендов ");
            return StatusCode(500, "Произошла ошибка на сервере");
        }
    }
    
    [HttpGet]
    [Route("products")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] int? brandId = null, [FromQuery] decimal minPrice = 0 )
    {
        try
        {
            IEnumerable<Product> products = brandId.HasValue
                ? await productService.GetProductsByBrandAsync(brandId.Value)
                : await productService.GetProductsAsync();

            if (minPrice > 0)
            {
                products = products.Where(p => p.Price >= minPrice);
            }

            var result = products.ToList();
            return result.Any() 
                ? Ok(result) 
                : NotFound(GetNotFoundMessage(brandId, minPrice));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка фильтрации товаров");
            return StatusCode(500, "Ошибка сервера");
        }
    }
    
    private string GetNotFoundMessage(int? brandId, decimal minPrice)
    {
        return brandId.HasValue
            ? minPrice > 0
                ? $"Товары бренда {brandId} от {minPrice} руб. не найдены"
                : $"Товары бренда {brandId} не найдены"
            : minPrice > 0
                ? $"Товары от {minPrice} руб. не найдены"
                : "Товары не найдены";
    }
}