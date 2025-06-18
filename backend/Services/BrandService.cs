using backend.Models;
using backend.Repository;

namespace backend.Services;

public class BrandService(IRepository<Brand> repository) : IBrandService
{
    public async Task<IEnumerable<Brand>> GetBrandsAsync() => await repository.GetAllAsync();
}