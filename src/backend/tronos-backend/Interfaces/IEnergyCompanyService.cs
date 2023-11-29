using tronos_backend.Entities;
using tronos_backend.Infrastructure;

namespace tronos_backend.Interfaces
{
    public interface IEnergyCompanyService : IBaseService<EnergyCompany>
    {
        Task<decimal> GetAverageKwhPriceByCountry();
        Task<decimal> GetAverageKwhPriceByState(string? stateCode);
        Task<EnergyCompany> GetByCode(string code);
        Task<IEnumerable<EnergyCompany>> GetByStateCode(string stateCode);
    }
}
