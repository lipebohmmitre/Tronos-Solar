using Microsoft.AspNetCore.Mvc;
using tronos_backend.Entities;
using tronos_backend.Infrastructure;

namespace tronos_backend.Interfaces
{
    public interface ICategoryService : IBaseService<Category>
    {
        Task<Category> CreateCategoryAndProduct([FromBody] Category category);
    }
}
