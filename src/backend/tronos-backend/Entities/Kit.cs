namespace tronos_backend.Entities
{
    public class Kit
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        public int SoldAmount { get; set; } = 0;
        public decimal KwhProductionPerMonthBase { get; set; } = 0;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
        public List<Product> Products { get; set; } = new List<Product>();
    }
}