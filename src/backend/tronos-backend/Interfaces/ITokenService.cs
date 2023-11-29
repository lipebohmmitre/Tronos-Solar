using tronos_backend.Entities;

namespace tronos_backend.Interfaces
{
    public interface ITokenService
    {
        string TokenCreate(User user);
    }
}
