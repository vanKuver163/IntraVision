using backend.Models;

namespace backend.Services;

public interface IBrandService
{
    Task<IEnumerable<Brand>> GetBrandsAsync();
}