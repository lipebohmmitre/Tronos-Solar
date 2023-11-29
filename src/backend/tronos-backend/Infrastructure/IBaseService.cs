namespace tronos_backend.Infrastructure
{
    public interface IBaseService<T>
    {
        Task<IEnumerable<T>> Get();

        Task<T> Get(int id);

        Task<T> Create(T entity);

        Task<T> Update(int id, T entity);

        Task Delete(int id);
    }
}
