using tronos_backend.Enums;

namespace tronos_backend.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public byte[] ImageData { get; set; } = new byte[0];
        public int EntityId { get; set; } 
        public EntityType EntityType { get; set; } = EntityType.Product;
    }
}
