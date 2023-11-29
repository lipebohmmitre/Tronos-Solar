using AutoMapper;
using tronos_backend.Entities;

namespace tronos_backend.Utils.Automapper.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductDTO>()
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories));

            CreateMap<ProductDTO, Product>()
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories))
                .ForMember(dest => dest.Kits, opt => opt.MapFrom(src => new List<Kit>()))
                .ForMember(dest => dest.CodeGPJ, opt => opt.MapFrom(src => ""));
        }
    }
}
