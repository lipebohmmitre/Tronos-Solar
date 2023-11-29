namespace tronos_backend.Entities
{
    public class KitDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        public decimal KwhProductionPerMonthBase { get; set; } = 0;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime LastModifiedDate { get; set; } = DateTime.Now;
        public IEnumerable<ProductDTO> Products { get; set; } = new List<ProductDTO>();

        #region OnlyInDTO
        public decimal KwhProductionPerMonthSolarRadiation { get; set; } = 0;
        public decimal PotencialSavePercentage { get; set; } = 0;
        #endregion
    }
}