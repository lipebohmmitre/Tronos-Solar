namespace tronos_backend.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Document { get; set; } = string.Empty;
        public string TypePerson { get; set; } = string.Empty;
        public bool Admin { get; set; }
    }
}
