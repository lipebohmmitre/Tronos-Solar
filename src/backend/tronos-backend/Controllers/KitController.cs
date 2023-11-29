using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tronos_backend.Entities;
using tronos_backend.Interfaces;

namespace tronos_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KitController : ControllerBase
    {
        private readonly IKitService _kitService;
        private readonly IMapper _automapper;

        public KitController(IKitService kitService, IMapper automapper)
        {
            _kitService = kitService;
            _automapper = automapper;
        }


        [HttpGet()]
        public async Task<IEnumerable<KitDTO>> Get([FromQuery] string? filter, [FromQuery] string? orderBy, [FromQuery] int? maxResults, [FromQuery] bool includeProducts = false)
        {
            var kits = await _kitService.GetKits(filter, orderBy, maxResults, includeProducts);

            var kitsDto = _automapper.Map<IEnumerable<KitDTO>>(kits);

            return kitsDto;
        }

        [HttpGet("{id}")]
        public async Task<KitDTO> Get([FromRoute] int id)
        {
            var kit = await _kitService.GetKitAsync(id);
            var kitDto = _automapper.Map<KitDTO>(kit);

            return kitDto;
        }

        [HttpGet("RecommendedKits")]
        public async Task<IEnumerable<KitDTO>> GetRecommendedKits([FromQuery] decimal? kWhValuePerMonth, [FromQuery] decimal? billValuePerMonth, [FromQuery] decimal? kwhPrice, [FromQuery] string? stateCode, [FromQuery] decimal? solarRadiationCoefficient = 1, [FromQuery] int maxResults = 3)
        {
            if ((kWhValuePerMonth == null || kWhValuePerMonth == 0) && (billValuePerMonth != null && billValuePerMonth > 0))
                kWhValuePerMonth = await _kitService.GetKwhByBillValue(billValuePerMonth.Value, kwhPrice, stateCode);

            var recommendedKits = await _kitService.GetRecommendedKits(kWhValuePerMonth, solarRadiationCoefficient, maxResults);

            var kitsDto = _automapper.Map<IEnumerable<KitDTO>>(recommendedKits);

            foreach (var kit in kitsDto)
            {
                kit.KwhProductionPerMonthSolarRadiation = kit.KwhProductionPerMonthBase * (solarRadiationCoefficient ?? 1);
                kit.PotencialSavePercentage = kWhValuePerMonth != null && kWhValuePerMonth.Value > 0 ? kit.KwhProductionPerMonthBase * (solarRadiationCoefficient ?? 1) * 100 / kWhValuePerMonth.Value : 0;
            }

            return kitsDto.OrderBy(p => p.KwhProductionPerMonthSolarRadiation);
        }

        [HttpGet("BestKit")]
        public async Task<KitDTO> GetBestKit([FromQuery] decimal? kWhValuePerMonth, [FromQuery] decimal? billValuePerMonth, [FromQuery] decimal? kwhPrice, [FromQuery] string? stateCode, [FromQuery] decimal? solarRadiationCoefficient = 1)
        {
            var recommendedKits = await this.GetRecommendedKits(kWhValuePerMonth, billValuePerMonth, kwhPrice, stateCode, solarRadiationCoefficient);

            var bestKit = recommendedKits.OrderBy(p => Math.Abs(100 - p.PotencialSavePercentage)).FirstOrDefault(p => p.PotencialSavePercentage >= 100);

            if (bestKit == null)
                bestKit = recommendedKits.OrderBy(p => Math.Abs(100 - p.PotencialSavePercentage)).FirstOrDefault();

            return bestKit;
        }

        [HttpPost]
        public async Task<KitDTO> Create([FromBody] KitDTO kitDto)
        {
            var kit = _automapper.Map<Kit>(kitDto);

            var kitCreated = await _kitService.Create(kit);
            var kitCreatedDto = _automapper.Map<KitDTO>(kitCreated);

            return kitCreatedDto;
        }

        [HttpPatch("{id}")]
        public async Task<KitDTO> Update([FromRoute] int id, [FromBody] KitDTO kitDto)
        {
            var kit = await _kitService.Get(id);

            if(kit != null)
            {
                kit = _automapper.Map<Kit>(kitDto);

                var kitUpdated = await _kitService.Update(kit);
                var kitUpdatedDto = _automapper.Map<KitDTO>(kitUpdated);

                return kitUpdatedDto;
            }

            return null;
        }

        [HttpDelete("{id}")]
        public async Task Delete([FromRoute] int id)
        {
            await _kitService.Delete(id);
        }
    }
}