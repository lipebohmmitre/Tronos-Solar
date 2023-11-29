using AutoMapper;
using tronos_backend.Entities;

namespace tronos_backend.Utils.Automapper.Profiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<Category, CategoryDTO>();
            CreateMap<CategoryDTO, Category>()
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => new List<Product>()))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => ""))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => new DateTime()))
                .ForMember(dest => dest.LastModifiedDate, opt => opt.MapFrom(src => new DateTime()));
        }
    }
}
