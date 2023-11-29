using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tronos_backend.Entities;
using tronos_backend.Interfaces;

namespace tronos_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _automapper;

        public CategoryController(ICategoryService categoryService, IMapper automapper)
        {
            _categoryService = categoryService;
            _automapper = automapper;
        }

        [HttpGet()]
        public async Task<IEnumerable<CategoryDTO>> Get()
        {
            var categories = await _categoryService.Get();
            var categoriesDto = _automapper.Map<IEnumerable<CategoryDTO>>(categories);

            return categoriesDto;
        }

        [HttpGet("{id}")]
        public async Task<CategoryDTO> Get([FromRoute] int id)
        {
            var category = await _categoryService.Get(id);
            var categoryDto = _automapper.Map<CategoryDTO>(category);

            return categoryDto;
        }

        [HttpPost]
        public async Task<CategoryDTO> Create([FromBody] CategoryDTO categoryDTO)
        {
            var category = _automapper.Map<Category>(categoryDTO);
            var createdCategory = await _categoryService.Create(category);
            var createdCategoryDto = _automapper.Map<CategoryDTO>(createdCategory);

            return createdCategoryDto;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            //todo: validar se existem produtos associados a essa categoria

            await _categoryService.Delete(id);
        }

        [HttpPatch("{id}")]
        public async Task<CategoryDTO> Update([FromRoute] int id, [FromBody] CategoryDTO categoryDTO)
        {
            var category = _automapper.Map<Category>(categoryDTO);
            var updatedCategory = await _categoryService.Update(id, category);
            var updatedCategoryDto = _automapper.Map<CategoryDTO>(updatedCategory);

            return updatedCategoryDto;
        }
    }
}