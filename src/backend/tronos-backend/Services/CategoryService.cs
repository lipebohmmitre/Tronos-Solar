using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tronos_backend.Entities;
using tronos_backend.Infrastructure;
using tronos_backend.Interfaces;

namespace tronos_backend.Services
{
    public class CategoryService : BaseService<Category>, ICategoryService
    {
        private readonly TronosDbContext _dbContext;
        public CategoryService(TronosDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Category> CreateCategoryAndProduct([FromBody] Category category)
        {
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();
            return category;
        }
    }
}
