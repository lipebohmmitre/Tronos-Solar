using Microsoft.EntityFrameworkCore;
using tronos_backend.Entities;
using tronos_backend.Infrastructure;
using tronos_backend.Interfaces;

namespace tronos_backend.Services
{
    public class KitService : BaseService<Kit>, IKitService
    {
        private readonly TronosDbContext _dbContext;
        private readonly IEnergyCompanyService _energyCompanyService;
        private readonly IProductService _productService;

        public KitService(TronosDbContext dbContext, IEnergyCompanyService energyCompanyService, IProductService productService) : base(dbContext)
        {
            _dbContext = dbContext;
            _energyCompanyService = energyCompanyService;
            _productService = productService;
        }

        public async Task<Kit> GetKitAsync(int kitId)
        {
            return await _dbContext.Kits.Include(p => p.Products).FirstOrDefaultAsync(k => k.Id == kitId);
        }

        public async Task<IEnumerable<Kit>> GetKits(string? filter, string? orderBy, int? maxResults, bool includeProducts)
        {
            var query = _dbContext.Kits.AsQueryable();
            
            if(includeProducts)
                query = query.Include(p => p.Products).AsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(p => p.Name.Contains(filter) || p.Description.Contains(filter));
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
                    default:
                        query = query.OrderBy(p => p.Id);
                        break;
                }
            }

            if (maxResults != null && maxResults > 0)
            {
                query = query.Take(maxResults.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Kit>> GetRecommendedKits(decimal? kwhValuePerMonth = null, decimal? solarRadiationCoefficient = 1, int maxResults = 3)
        {
            var query = _dbContext.Kits.AsQueryable();

            if (!kwhValuePerMonth.HasValue || kwhValuePerMonth <= 0)
                return await query.OrderByDescending(p => p.SoldAmount).Take(maxResults).ToListAsync();

            if(solarRadiationCoefficient.HasValue && solarRadiationCoefficient > 0)
                query = query.OrderBy(p => Math.Abs((p.KwhProductionPerMonthBase * solarRadiationCoefficient.Value) - kwhValuePerMonth.Value));
            else
                query = query.OrderBy(p => Math.Abs(p.KwhProductionPerMonthBase - kwhValuePerMonth.Value));

            return await query.Take(maxResults).ToListAsync();
        }

        public async Task<decimal> GetKwhByBillValue(decimal billValue, decimal? kwhPrice = null, string? stateCode = null)
        {
            if (kwhPrice == null || kwhPrice == 0)
            {
                if(stateCode != null & stateCode != string.Empty)
                    kwhPrice = await _energyCompanyService.GetAverageKwhPriceByState(stateCode);
                
                if((kwhPrice == null || kwhPrice == 0) && (stateCode == null || stateCode == string.Empty))
                    kwhPrice = await _energyCompanyService.GetAverageKwhPriceByCountry();
            }

            return billValue / kwhPrice.Value;
        }

        public async Task<Kit> Create(Kit kit)
        {
            var products = await _productService.GetByIdList(kit.Products.Select(p => p.Id));

            kit.Products = products.ToList();

            var kitDb = await _dbContext.Kits.AddAsync(kit);
            await _dbContext.SaveChangesAsync();

            return kitDb.Entity;
        }

        public async Task<Kit> Update(Kit kit)
        {
            var products = await _productService.GetByIdList(kit.Products.Select(p => p.Id));
            kit.Products = products.ToList();

            var kitToUpdate = _dbContext.Kits.Include(p => p.Products).Where(p => p.Id == kit.Id).FirstOrDefault();

            kitToUpdate.Name = kit.Name ?? kitToUpdate.Name;
            kitToUpdate.Description = kit.Description ?? kitToUpdate.Description;
            kitToUpdate.Price = kit.Price;
            kitToUpdate.KwhProductionPerMonthBase = kit.KwhProductionPerMonthBase;
            kitToUpdate.SoldAmount = kit.SoldAmount > 0 ? kit.SoldAmount : kitToUpdate.SoldAmount;
            kitToUpdate.Products = kit.Products;
            kitToUpdate.LastModifiedDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();

            return kitToUpdate;
        }
    }
}