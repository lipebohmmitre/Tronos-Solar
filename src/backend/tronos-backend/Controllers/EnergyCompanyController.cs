using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using tronos_backend.Entities;
using tronos_backend.Interfaces;

namespace tronos_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnergyCompanyController : ControllerBase
    {
        private readonly IEnergyCompanyService _energyCompanyService;
        private readonly IMapper _automapper;

        public EnergyCompanyController(IEnergyCompanyService energyCompanyService, IMapper automapper)
        {
            _energyCompanyService = energyCompanyService;
            _automapper = automapper;
        }

        [HttpGet()]
        public async Task<IEnumerable<EnergyCompanyDTO>> Get()
        {
            var companies = await _energyCompanyService.Get();
            var companiesDto = _automapper.Map<IEnumerable<EnergyCompanyDTO>>(companies);

            return companiesDto;
        }

        [HttpGet("{id}")]
        public async Task<EnergyCompanyDTO> Get([FromRoute] int id)
        {
            var energyCompany = await _energyCompanyService.Get(id);
            var energyCompanyDto = _automapper.Map<EnergyCompanyDTO>(energyCompany);

            return energyCompanyDto;
        }

        [HttpGet("State/{stateCode}")]
        public async Task<IEnumerable<EnergyCompanyDTO>> GetByStateCode([FromRoute] string stateCode)
        {
            var companies = await _energyCompanyService.GetByStateCode(stateCode);
            var companiesDto = _automapper.Map<IEnumerable<EnergyCompanyDTO>>(companies);

            return companiesDto;
        }

        [HttpPost]
        public async Task<EnergyCompanyDTO> Create([FromBody] EnergyCompanyDTO energyCompanyDTO)
        {
            var energyCompany = _automapper.Map<EnergyCompany>(energyCompanyDTO);
            var createdEnergyCompany = await _energyCompanyService.Create(energyCompany);
            var createdEnergyCompanyDto = _automapper.Map<EnergyCompanyDTO>(createdEnergyCompany);

            return createdEnergyCompanyDto;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _energyCompanyService.Delete(id);
        }

        [HttpPatch("{id}")]
        public async Task<EnergyCompanyDTO> Update([FromRoute] int id, [FromBody] EnergyCompanyDTO energyCompanyDTO)
        {
            var energyCompany = _automapper.Map<EnergyCompany>(energyCompanyDTO);
            var updatedEnergyCompany = await _energyCompanyService.Update(id, energyCompany);
            var updatedEnergyCompanyDto = _automapper.Map<EnergyCompanyDTO>(updatedEnergyCompany);

            return updatedEnergyCompanyDto;
        }

        [HttpGet("AverageKwhPrice")]
        public async Task<decimal> AverageKwhPrice([FromQuery] string? energyCompanyCode, [FromQuery] string? stateCode)
        {
            if (!energyCompanyCode.IsNullOrEmpty())
            {
                var energyCompany = await _energyCompanyService.GetByCode(energyCompanyCode);
                
                if(energyCompany != null)
                    return energyCompany.KwhPrice;
            }

            if (!stateCode.IsNullOrEmpty())
            {
                var avarageByState = await _energyCompanyService.GetAverageKwhPriceByState(stateCode);

                if (avarageByState > 0)
                    return avarageByState;
            }

            return await _energyCompanyService.GetAverageKwhPriceByCountry();
        }
    }
}