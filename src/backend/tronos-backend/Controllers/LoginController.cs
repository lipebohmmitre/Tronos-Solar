using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using tronos_backend.Encrypt;
using tronos_backend.Entities;
using tronos_backend.Infrastructure;
using tronos_backend.Interfaces;
using tronos_backend.Migrations;

namespace tronos_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly ITokenService _tokenService;
        private readonly TronosDbContext _dbContext;

        public LoginController(IUserService userService, IConfiguration configuration, ITokenService tokenService, TronosDbContext dbContext)
        {
            _userService = userService;
            _configuration = configuration;
            _tokenService = tokenService;
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> getUserbyEmailAndPassword([FromBody] User user)
        {
            var userGet = await _userService.QueryGetUserByEmailOrPassword(user).ToListAsync();

            if (!userGet[0].Admin) return Ok(userGet[0].Id.ToString());


            var tokenResponse = _tokenService.TokenCreate(user);

            if (!userGet[0].Admin) return Ok(userGet[0].Id.ToString());

            var responseList = new List<string>{ tokenResponse, userGet[0].Id.ToString() };

            return Ok(responseList);
        }

        [HttpGet("VerifyToken")]
        [Authorize]
        public bool VerifyToken()
        {
            return true;
        }
    }

}
