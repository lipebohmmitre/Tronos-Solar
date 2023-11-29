using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using tronos_backend.Entities;
using tronos_backend.Interfaces;
using tronos_backend.Services;

namespace tronos_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        private readonly IMapper _automapper;

        public ProductController(IProductService productService, ICategoryService categoryService, IMapper automapper)
        {
            _productService = productService;
            _categoryService = categoryService;
            _automapper = automapper;
        }

        [HttpGet()]
        public async Task<IEnumerable<ProductDTO>> Get([FromQuery] string? filter, [FromQuery] string? categories, [FromQuery] string? orderBy, [FromQuery] int? maxResults)
        {
            var categoriesIds = !categories.IsNullOrEmpty() ? categories?.Split(',').Select(int.Parse).ToArray() : null;

            var products = await _productService.GetProductsWithCategories(filter, categoriesIds, orderBy, maxResults);

            var productsDto = _automapper.Map<IEnumerable<ProductDTO>>(products);

            return productsDto;
        }

        [HttpGet("{id}")]
        public async Task<ProductDTO> Get([FromRoute] int id)
        {
            var product = await _productService.Get(id);
            var productDto = _automapper.Map<ProductDTO>(product);

            return productDto;
        }

        [HttpPost]
        public async Task<ProductDTO> Create([FromBody] ProductDTO productDTO)
        {
            var product = _automapper.Map<Product>(productDTO);
            var createdProduct = await _productService.Create(product);
            var createdProductDto = _automapper.Map<ProductDTO>(createdProduct);

            return createdProductDto;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _productService.Delete(id);
        }

        [HttpPatch("{id}")]
        public async Task<ProductDTO> Update([FromRoute] int id, [FromBody] ProductDTO productDTO)
        {
            var product = _automapper.Map<Product>(productDTO);
            var updatedProduct = await _productService.Update(id, product);
            var updatedProductDto = _automapper.Map<ProductDTO>(updatedProduct);

            return updatedProductDto;
        }

    }
}