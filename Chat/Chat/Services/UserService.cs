using System;
using System.Collections.Generic;
using System.Linq;
using Chat.Exceptions;
using Chat.Models;
using Chat.Services.Interfaces;

namespace Chat.Services
{
    public class UserService : IUserService
    {
        private static List<User> _users = new List<User>();
        private readonly IDictionary<string, string> _connectedChatUsers;
        private readonly ISecurityService _securityService;

        public UserService(ISecurityService securityService)
        {
            _connectedChatUsers = new Dictionary<string, string>();
            _securityService = securityService;
        }

        public User CreateUser(string username)
        {
            throw new NotImplementedException();
        }

        public void DeleteUser(string username)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> GetConnectedUsers()
        {
            throw new NotImplementedException();
        }

        public void JoinChat(string connectionId, string username)
        {
            throw new NotImplementedException();
        }

        public void LeaveChat(string connectionId)
        {
            throw new NotImplementedException();
        }
    }
}