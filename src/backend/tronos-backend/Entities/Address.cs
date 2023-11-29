namespace tronos_backend.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string Cep { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Number { get; set; } = string.Empty;
        public string Observation { get; set; } = string.Empty;
    }
}
