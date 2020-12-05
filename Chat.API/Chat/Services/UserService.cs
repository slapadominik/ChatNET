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
        private static List<User> Users = new List<User>();
        private readonly IDictionary<string, string> _connectedChatUsers;
        private readonly ISecurityService _securityService;

        public UserService(ISecurityService securityService)
        {
            _connectedChatUsers = new Dictionary<string, string>();
            _securityService = securityService;
        }

        public User CreateUser(string username)
        {
            if (Users.SingleOrDefault(x => x.Username == username) != null)
            {
                throw new UsernameIsTakenException($"User {username} already exists.");
            }

            var user = new User { Id = Guid.NewGuid(), Username = username};
            Users.Add(user);

            var token = _securityService.CreateToken(username);
            user.Token = _securityService.WriteToken(token);

            return user;
        }

        public void DeleteUser(string username)
        {
            var user = Users.SingleOrDefault(x => x.Username == username);
            if ( user == null)
            {
                throw new UserNotFoundException($"User {username} not found.");
            }
            Users.Remove(user);
        }

        public void JoinChat(string connectionId, string username)
        {
            if (_connectedChatUsers.ContainsKey(connectionId))
            {
                throw new InvalidOperationException($"User {username} connected with id {connectionId} is connected to chat.");
            }

            _connectedChatUsers.Add(connectionId, username);
        }

        public void LeaveChat(string connectionId)
        {
            if (!_connectedChatUsers.ContainsKey(connectionId))
            {
                throw new InvalidOperationException($"Connection with id {connectionId} isn't connected to chat.");
            }

            _connectedChatUsers.Remove(connectionId);
        }

        public IEnumerable<string> GetConnectedUsers()
        {
            return _connectedChatUsers.Values;
        }
    }
}