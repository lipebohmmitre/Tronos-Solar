using AutoMapper;
using tronos_backend.Entities;

namespace tronos_backend.Utils.Automapper.Profiles
{
    public class EnergyCompanyProfile : Profile
    {
        public EnergyCompanyProfile()
        {
            CreateMap<EnergyCompany, EnergyCompanyDTO>();
            CreateMap<EnergyCompanyDTO, EnergyCompany>();
        }
    }
}
