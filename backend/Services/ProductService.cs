using backend.Models;
using backend.Repository;

namespace backend.Services;

public class ProductService(IRepository<Product> repository) : IProductService
{
    public async Task<IEnumerable<Product>> GetProductsAsync() =>
        await repository.GetAllAsync(null, null, p => p.Brand!);

    public async Task<IEnumerable<Product>> GetProductsByBrandAsync(int brandId) =>
        await repository.GetAllAsync(p => p.BrandId == brandId, null, p => p.Brand!);
}