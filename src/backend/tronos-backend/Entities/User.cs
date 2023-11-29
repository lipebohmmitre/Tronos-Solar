using tronos_backend.Enums;

namespace tronos_backend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Document { get; set; } = string.Empty;
        public PersonType PersonType { get; set; } = PersonType.NaturalPerson;
        public bool Admin { get; set; } = false;
        public Address Address{ get; set; } = new Address();
    }
}
