using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tronos_backend.Entities;

namespace tronos_backend.Infrastructure.EntitiesConfiguration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(150);
            builder.Property(x => x.Document).IsRequired().HasMaxLength(100);
            builder.Property(x => x.PersonType).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Admin).IsRequired();
        }
    }
}
