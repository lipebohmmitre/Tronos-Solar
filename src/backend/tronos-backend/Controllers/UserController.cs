using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tronos_backend.Encrypt;
using tronos_backend.Entities;
using tronos_backend.Infrastructure;
using tronos_backend.Interfaces;
namespace tronos_backend.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly TronosDbContext _dbContext; // Foi mal, to fazendo gambiarra
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, TronosDbContext dbContext, IConfiguration configuration)
        {
            _userService = userService;
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost] //todo: usar dto
        public async Task<User> Create([FromBody] User user)
        {
            IQueryable<User> query = _dbContext.Users;
            query = query.Where(x => x.Email == user.Email);

            if (query.Count() > 0) throw new Exception("Este Email já existe!");

            Cryptography cryptography = new Cryptography("sadfasdplsalvkp~sadfsdfsadf564615s1d6v4asASDFKAOIMasdvkasdmvds55A4DFKavsvvl~dfg]~ÇVsdfasdfAS[DPLFSA5D64F]");
            user.Password = cryptography.Encrypt(user.Password);

            return await _userService.Create(user);
        }

        [HttpGet()]
        public async Task<IEnumerable<User>> Get()
        {
            return await _userService.Get();
        }
        [HttpGet("{id}")]
        public async Task<User> Get(int id)
        {
            return await _userService.Get(id);
        }
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _userService.Delete(id);
        }

        [HttpPatch("{id}")]
        public async Task<User> Update([FromRoute] int id, [FromBody] User user)
        {
            IQueryable<User> query = _dbContext.Users;
            query = query.Where(x => x.Email == user.Email);

            if (query.Count() > 0) throw new Exception("Este Email já existe!");

            return await _userService.Update(id, user);
        }
    }
}
