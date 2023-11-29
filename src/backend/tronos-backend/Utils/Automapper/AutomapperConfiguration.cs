using AutoMapper;
using AutoMapper.Internal;
using tronos_backend.Utils.Automapper.Profiles;

namespace tronos_backend.Utils.Automapper
{
    public static class AutomapperConfiguration
    {
        public static IMapper CreateMapper()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<KitProfile>();
                cfg.AddProfile<ProductProfile>();
                cfg.AddProfile<CategoryProfile>();
                cfg.AddProfile<EnergyCompanyProfile>();

                cfg.AllowNullCollections = true;
                cfg.AllowNullDestinationValues = true;
                cfg.Internal().AllowAdditiveTypeMapCreation = true;
            });

            configuration.AssertConfigurationIsValid();

            return configuration.CreateMapper();
        }

        public static WebApplicationBuilder ConfigureServices(WebApplicationBuilder builder)
        {
            var mapper = CreateMapper();

            builder.Services.AddSingleton(mapper);

            return builder;
        }
    }
}
