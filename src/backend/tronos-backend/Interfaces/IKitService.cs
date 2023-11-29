using tronos_backend.Entities;
using tronos_backend.Infrastructure;

namespace tronos_backend.Interfaces
{
    public interface IKitService : IBaseService<Kit>
    {
        Task<Kit> GetKitAsync(int kitId);
        Task<IEnumerable<Kit>> GetKits(string? filter, string? orderBy, int? maxResults, bool includeProducts);

        Task<IEnumerable<Kit>> GetRecommendedKits(decimal? kwhValuePerMonth = null, decimal? solarRadiationCoefficient = 1, int maxResults = 3);

        Task<decimal> GetKwhByBillValue(decimal billValue, decimal? kwhPrice = null, string? stateCode = null);

        Task<Kit> Create(Kit kit);

        Task<Kit> Update(Kit kit);
    }
}
