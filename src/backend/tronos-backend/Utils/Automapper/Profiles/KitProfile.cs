using AutoMapper;
using tronos_backend.Entities;

namespace tronos_backend.Utils.Automapper.Profiles
{
    public class KitProfile : Profile
    {
        public KitProfile()
        {
            CreateMap<Kit, KitDTO>()
                .ForMember(dest => dest.KwhProductionPerMonthSolarRadiation, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.PotencialSavePercentage, opt => opt.MapFrom(src => 0));
            CreateMap<KitDTO, Kit>()
                .ForMember(dest => dest.SoldAmount, opt => opt.MapFrom(src => 0));
        }
    }
}
