namespace tronos_backend.Infrastructure
{
    public static class DepencyInjectionConfig
    {
        public static WebApplicationBuilder ConfigureServices(WebApplicationBuilder builder)
        {
            builder.Services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));

            // Find all types in all loaded assemblies that implement IBaseService
            var services = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(a => a.GetTypes())
                .Where(a => a.Namespace == "tronos_backend.Services")
                .ToList();

            var interfaces = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(a => a.GetTypes())
                .Where(a => a.Namespace == "tronos_backend.Interfaces")
                .ToList();

            // Register each type as a scoped service
            foreach (var @interface in interfaces)
            {
                var service = services.Where(p => p.Name == @interface.Name.Substring(1, @interface.Name.Length - 1)).FirstOrDefault();

                if(service != null)
                    builder.Services.AddScoped(@interface, service);
            }

            return builder;
        }
    }
}
