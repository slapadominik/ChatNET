using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Chat.Helpers;
using Chat.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Chat.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly AppSettings _appSettings;

        public SecurityService(IOptions<AppSettings> appSettings)
        {
            _tokenHandler = new JwtSecurityTokenHandler();
            _appSettings = appSettings.Value;
        }

        public string WriteToken(SecurityToken token)
        {
            return _tokenHandler.WriteToken(token);
        }

        public SecurityToken CreateToken(string username)
        {
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            return _tokenHandler.CreateToken(tokenDescriptor);
        }
    }
}