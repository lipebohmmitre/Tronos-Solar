using tronos_backend.Entities;
using tronos_backend.Infrastructure;

namespace tronos_backend.Interfaces
{
    public interface IUserService : IBaseService<User>
    {
        IQueryable<User> QueryGetUserByEmailOrPassword(User user);
    }
}
