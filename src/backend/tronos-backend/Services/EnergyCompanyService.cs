using Microsoft.EntityFrameworkCore;
using tronos_backend.Entities;
using tronos_backend.Infrastructure;
using tronos_backend.Interfaces;
using tronos_backend.Utils;

namespace tronos_backend.Services
{
    public class EnergyCompanyService : BaseService<EnergyCompany>, IEnergyCompanyService
    {
        private readonly TronosDbContext _dbContext;

        public EnergyCompanyService(TronosDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<EnergyCompany> GetByCode(string code)
        {
            return await _dbContext.EnergyCompanies.FirstOrDefaultAsync(p => p.Code.ToLower() == code.ToLower());
        }

        public async Task<IEnumerable<EnergyCompany>> GetByStateCode(string stateCode)
        {
            return await _dbContext.EnergyCompanies.Where(p => p.StateCode.ToLower() == stateCode.ToLower())
                                                   .OrderBy(p => p.Name)
                                                   .ToListAsync();
        }

        public async Task<decimal> GetAverageKwhPriceByState(string stateCode)
        {
            var result = 0m;

            var query = _dbContext.EnergyCompanies.Where(p => 
                                        p.StateCode.ToLower() == stateCode.ToLower() && 
                                        p.KwhPrice > 0);

            if(query.Count() > 0)
                result = await query.AverageAsync(p => p.KwhPrice);

            return result;
        }

        public async Task<decimal> GetAverageKwhPriceByCountry()
        {
            var query = _dbContext.EnergyCompanies.Where(p => p.KwhPrice > 0);
            var result = await query.AverageAsync(p => p.KwhPrice);
            return result;
        }
    }
}
