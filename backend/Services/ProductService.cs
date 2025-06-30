using backend.DTOs;
using backend.Models;
using backend.Repository;
using backend.Utils;

namespace backend.Services;

public class ProductService(
    IRepository<Product> repository,
    IRepository<Brand> brandRepository,
    ILogger<ProductService> logger) : IProductService
{
    public async Task<IEnumerable<Product>> GetProductsAsync() =>
        await repository.GetAllAsync(null, p => p.OrderBy(c => c.Name), p => p.Brand!);

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

    public async Task<IEnumerable<Product>> GetFilteredProductsAsync(int? brandId, decimal minPrice)
    {
        var products = await repository.GetAllAsync(includes: p => p.Brand!);

        var query = products.AsQueryable();

        if (brandId.HasValue)
        {
            query = query.Where(p => p.BrandId == brandId.Value);
        }

        if (minPrice > 0)
        {
            query = query.Where(p => p.Price >= minPrice);
        }

        return query.ToList();
    }

    public async Task<OperationResult> ImportProductsAsync(List<ImportProductRequest> importProducts)
    {
        try
        {
            int brandsAdded = 0;
            int productsAdded = 0;
            int productsUpdated = 0;
            string? lastError = null;

            foreach (var importProduct in importProducts)
            {
                try
                {
                    if (importProduct.Price < 0 || importProduct.Quantity < 0)
                    {
                        lastError =
                            $"Неверные данные для продукта {importProduct.Name}: цена или количество не могут быть отрицательными";
                        continue;
                    }

                    if (!string.IsNullOrEmpty(importProduct.ImagePath))
                    {
                        var imagePath = Path.Combine("wwwroot", importProduct.ImagePath.TrimStart('/'));
                        if (!File.Exists(imagePath))
                        {
                            lastError =
                                $"Файл изображения не найден для продукта {importProduct.Name}: {importProduct.ImagePath}";
                            continue;
                        }
                    }

                    var brand = await brandRepository.FirstOrDefaultAsync(b => b.Name == importProduct.Brand);
                    if (brand == null)
                    {
                        brand = new Brand { Name = importProduct.Brand };
                        await brandRepository.AddAsync(brand);
                        brandsAdded++;
                    }

                    var existingProduct = await repository.FirstOrDefaultAsync(
                        p => p.Name == importProduct.Name && p.BrandId == brand.Id);

                    if (existingProduct == null)
                    {
                        await repository.AddAsync(new Product
                        {
                            Name = importProduct.Name,
                            Price = importProduct.Price,
                            Quantity = importProduct.Quantity,
                            ImagePath = importProduct.ImagePath,
                            BrandId = brand.Id
                        });
                        productsAdded++;
                    }
                    else
                    {
                        existingProduct.Price = importProduct.Price;
                        existingProduct.Quantity = importProduct.Quantity;
                        existingProduct.ImagePath = importProduct.ImagePath;
                        await repository.UpdateAsync(existingProduct);
                        productsUpdated++;
                    }
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, $"Ошибка при обработке продукта {importProduct.Name}");
                    lastError = $"Ошибка при обработке продукта {importProduct.Name}";
                }
            }

            logger.LogInformation(
                $"Импорт завершен. Добавлено брендов: {brandsAdded}, продуктов: {productsAdded}, обновлено: {productsUpdated}");

            return lastError != null
                ? OperationResult.Fail(lastError)
                : OperationResult.Success();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при импорте продуктов");
            return OperationResult.Fail("Произошла ошибка при импорте продуктов");
        }
    }
}