using Microsoft.AspNetCore.Http.HttpResults;
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

namespace tronos_backend.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly TronosDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(TronosDbContext dbContext, IConfiguration configuration) : base(dbContext)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }


        public IQueryable<User> QueryGetUserByEmailOrPassword(User user) 
        {
            Cryptography cryptography = new Cryptography("sadfasdplsalvkp~sadfsdfsadf564615s1d6v4asASDFKAOIMasdvkasdmvds55A4DFKavsvvl~dfg]~ÇVsdfasdfAS[DPLFSA5D64F]");
            var pass = cryptography.Encrypt(user.Password);


            IQueryable<User> query = _dbContext.Users;
            IQueryable<User> queryPassword = _dbContext.Users;
            query = query.Where(x => x.Email == user.Email);
            queryPassword = queryPassword.Where(x => x.Password == pass);

            if (query.Count() < 1 || queryPassword.Count() < 1)
                throw new Exception("Email ou Senha incorretos!");

            return query;
        }

    }

}
