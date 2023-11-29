using Microsoft.EntityFrameworkCore;
using tronos_backend.Entities;
using tronos_backend.Infrastructure.EntitiesConfiguration;

namespace tronos_backend.Infrastructure
{
    public class TronosDbContext : DbContext
    {
        public TronosDbContext(DbContextOptions<TronosDbContext> options) : base(options)
        {
        }
        public DbSet<Kit> Kits { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<EnergyCompany> EnergyCompanies { get; set; }
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new AddressConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
    }
}
