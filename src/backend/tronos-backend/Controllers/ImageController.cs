using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tronos_backend.Entities;
using tronos_backend.Enums;
using tronos_backend.Interfaces;

namespace tronos_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet("{entityType}/{entityId}")]
        public async Task<IActionResult> Get([FromRoute] int entityId, [FromRoute] EntityType entityType)
        {
            var image = await _imageService.Get(entityId, entityType);
            if (image == null)
                return NoContent();

            return File(image.ImageData, "image/jpeg");
        }

        [HttpPost("{entityType}/{entityId}/upload")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromRoute] int entityId, [FromRoute] EntityType entityType)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            if (entityId <= 0)
                return BadRequest("No entity to associate.");

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var image = new Image
                {
                    ImageData = memoryStream.ToArray(),
                    FileName = file.FileName
                };

                image.EntityType = entityType;
                image.EntityId = entityId;

                try
                {
                    //Só pode haver uma imagem por entidade
                    var oldImage = await _imageService.Get(entityId, entityType);
                    if(oldImage != null)
                        await _imageService.Delete(oldImage.Id);

                    var result = await _imageService.Create(image);
                    return Ok(result);

                }catch (Exception ex)
                {
                    return StatusCode(500,ex.Message);
                }
            }
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _imageService.Delete(id);
        }
    }
}