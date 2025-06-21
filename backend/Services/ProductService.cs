using backend.DTOs;
using backend.Models;
using backend.Repository;
using backend.Utils;

namespace backend.Services;

public class ProductService(IRepository<Product> repository, ILogger<ProductService> logger) : IProductService
{
    public async Task<IEnumerable<Product>> GetProductsAsync() =>
        await repository.GetAllAsync(null, p => p.OrderBy(c => c.Name), p => p.Brand!);

    public async Task<IEnumerable<Product>> GetProductsByBrandAsync(int brandId) =>
        await repository.GetAllAsync(p => p.BrandId == brandId, null, p => p.Brand!);

    public async Task<OperationResult> DeductProductsAsync(List<CartItem> products)
    {
        try
        {
            var productsToDeduct = products.Select(p => new Product
            {
                Id = p.Product.Id,
                Name = p.Product.Name,
                Price = p.Product.Price,
                Quantity = p.Quantity,
                ImagePath = p.Product.ImagePath,
                BrandId = p.Product.BrandId,
                Brand = p.Product.Brand
            }).ToList();
            var existingProducts = (await repository.GetAllAsync(
                p => productsToDeduct.Select(x => x.Id).Contains(p.Id))).ToList();

            foreach (var product in existingProducts)
            {
                var deductAmount = productsToDeduct.First(p => p.Id == product.Id).Quantity;
                product.Quantity -= deductAmount;
            }

            await repository.UpdateRangeAsync(existingProducts);
            return OperationResult.Success();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка списания продуктов из базы данных");
            return OperationResult<Coin>.Fail("Ошибка списания продуктов");
        }
    }

    public async Task<OperationResult<Product>> UpdateQuantityProduct(
        int quantity, 
        int? productId = null,
        string? productName = null)
    {
        try
        {
            if (productId == null && productName == null)
                return OperationResult<Product>.Fail("Не указан идентификатор или название продукта");

            Product? product = null;
        
            if (productId != null)
            {
                product = await repository.FirstOrDefaultAsync(p => p.Id == productId);
            }
            else if (productName != null)
            {
                product = await repository.FirstOrDefaultAsync(p => p.Name == productName);
            }

            if (product == null)
                return OperationResult<Product>.Fail("Продукт не найден");

            product.Quantity = quantity;
            await repository.UpdateAsync(product);
        
            return OperationResult<Product>.Success(product);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при обновлении количества продукта");
            return OperationResult<Product>.Fail("Ошибка при обновлении количества продукта");
        }
    }
}