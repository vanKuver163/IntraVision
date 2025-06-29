using backend.DTOs;
using backend.Models;
using backend.Utils;

namespace backend.Services;

public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<OperationResult> DeductProductsAsync(List<CartItem> productsToDeduct);
    Task<OperationResult<Product>> UpdateQuantityProduct(int quantity, int? productId = null, string? productName = null);
    Task<IEnumerable<Product>> GetFilteredProductsAsync(int? brandId, decimal minPrice);
}