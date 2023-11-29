using Microsoft.EntityFrameworkCore;
using tronos_backend.Entities;
using tronos_backend.Enums;
using tronos_backend.Infrastructure;
using tronos_backend.Interfaces;

namespace tronos_backend.Services
{
    public class ImageService : BaseService<Image>, IImageService
    {
        private readonly TronosDbContext _dbContext;
        public ImageService(TronosDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Image> Get(int entityId, EntityType entityType)
        {
            return await _dbContext.Images.Where(p => p.EntityId == entityId && p.EntityType == entityType).FirstOrDefaultAsync();
        }
    }
}
