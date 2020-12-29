using System;
using System.Collections.Generic;
using System.Security.Claims;
using Chat.Entity;
using Microsoft.AspNetCore.SignalR;

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