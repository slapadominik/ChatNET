using System.Collections.Generic;
using Chat.Models;

namespace Chat.Services.Interfaces
{
    public interface IUserService
    {
        User CreateUser(string username);
        void DeleteUser(string username);
        void JoinChat(string connectionId, string username);
        void LeaveChat(string connectionId);
        IEnumerable<string> GetConnectedUsers();
    }
}