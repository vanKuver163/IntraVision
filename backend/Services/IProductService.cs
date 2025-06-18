using backend.Models;

namespace backend.Services;

public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<IEnumerable<Product>> GetProductsByBrandAsync(int brandId);
}