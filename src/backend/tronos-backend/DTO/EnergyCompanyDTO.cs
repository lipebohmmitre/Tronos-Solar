namespace tronos_backend.Entities
{
    public class EnergyCompanyDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string StateCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal KwhPrice { get; set; } = 0;
    }
}