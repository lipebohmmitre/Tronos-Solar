using tronos_backend.Entities;
using tronos_backend.Infrastructure;

namespace tronos_backend.Interfaces
{
    public interface IProductService : IBaseService<Product>
    {
        Task<IEnumerable<Product>> GetByIdList(IEnumerable<int> idList);
        Task<IEnumerable<Product>> GetProductsWithCategories(string? filter, int[]? categories, string? orderBy, int? maxResults);
    }
}
