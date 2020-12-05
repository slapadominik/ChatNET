using Microsoft.IdentityModel.Tokens;

namespace Chat.Services.Interfaces
{
    public interface ISecurityService
    {
        string WriteToken(SecurityToken token);

        SecurityToken CreateToken(string username);
    }
}