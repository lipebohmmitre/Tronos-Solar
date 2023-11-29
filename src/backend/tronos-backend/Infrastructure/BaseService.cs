using Microsoft.EntityFrameworkCore;

namespace tronos_backend.Infrastructure
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        private readonly TronosDbContext _dbContext;

        public BaseService(TronosDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<T> Get(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> Get()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task<T> Create(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<T> Update(int id, T entity)
        {
            var entityToUpdate = _dbContext.Set<T>().Find(id);
            _dbContext.Entry(entityToUpdate).CurrentValues.SetValues(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }

        public async Task Delete(int id)
        {
            var entity = _dbContext.Set<T>().Find(id);

            if (entity != null)
            {
                _dbContext.Set<T>().Remove(entity);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
