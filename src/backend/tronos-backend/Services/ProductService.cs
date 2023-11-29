using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using tronos_backend.Entities;
using tronos_backend.Infrastructure;
using tronos_backend.Interfaces;

namespace tronos_backend.Services
{
    public class ProductService : BaseService<Product>, IProductService
    {
        private readonly TronosDbContext _dbContext;
        public ProductService(TronosDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>> GetProductsWithCategories(string? filter, int[]? categories, string? orderBy, int? maxResults)
        {
            var query = _dbContext.Products.Include(p => p.Categories).AsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(p => p.Name.Contains(filter) || p.Description.Contains(filter));
            }

            if (categories != null && categories.Length > 0)
            {
                query = query.Where(p => p.Categories.Any(c => categories.Contains(c.Id)));
            }

            if (!string.IsNullOrEmpty(orderBy))
            {
                switch (orderBy.ToLower())
                {
                    case "recent":
                        query = query.OrderByDescending(p => p.CreatedDate);
                        break;
                    case "older":
                        query = query.OrderBy(p => p.CreatedDate);
                        break;
                    case "name":
                        query = query.OrderBy(p => p.Name);
                        break;
                    case "minorprice":
                        query = query.OrderBy(p => p.Price);
                        break;
                    case "majorrprice":
                        query = query.OrderByDescending(p => p.Price);
                        break;
                    default:
                        query = query.OrderBy(p => p.Id);
                        break;
                }
            }

            if(maxResults != null && maxResults > 0)
            {
                query = query.Take(maxResults.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Product> Create([FromBody] Product product)
        {
            BaseService<Product> produtoBase = new BaseService<Product>(_dbContext);
            await produtoBase.Create(product);

            return product;
        }

        public async Task<IEnumerable<Product>> GetByIdList(IEnumerable<int> idList)
        {
            return await _dbContext.Products.Where(p => idList.Contains(p.Id)).ToListAsync();
        }
    }
}
