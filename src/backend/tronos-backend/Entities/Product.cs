namespace tronos_backend.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string CodeGPJ { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; } = decimal.Zero;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
        public List<Category> Categories { get; set; } = new List<Category>();
        public List<Kit> Kits { get; set; } = new List<Kit>();
    }
}