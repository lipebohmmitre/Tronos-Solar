using System.Drawing;
using tronos_backend.Entities;
using tronos_backend.Enums;
using tronos_backend.Infrastructure;

namespace tronos_backend.Interfaces
{
    public interface IImageService : IBaseService<Entities.Image>
    {
        Task<Entities.Image> Get(int entityId, EntityType entityType);
    }
}
