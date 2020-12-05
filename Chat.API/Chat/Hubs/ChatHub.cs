using System;
using System.Threading.Tasks;
using Chat.DTO;
using Chat.Exceptions;
using Chat.Hubs.Interfaces.Client;
using Chat.Hubs.Interfaces.Server;
using Chat.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Hubs
{
    [Authorize]
    public class ChatHub : Hub<IClientChatActions>, IServerChatActions
    {
        private readonly IUserService _userService;

        public ChatHub(IUserService userService)
        {
            _userService = userService;
        }

        public override async Task OnConnectedAsync()
        {
            var username = Context.User?.Identity?.Name;

            try
            {
                var connectedUsers = _userService.GetConnectedUsers();
                await Clients.Caller.SetConnectedUsers(connectedUsers);

                _userService.JoinChat(Context.ConnectionId, username);
                await Clients.All.UserJoined(username);
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var username = Context.User?.Identity?.Name;

            try
            {
                _userService.LeaveChat(Context.ConnectionId);
                _userService.DeleteUser(username);
                await Clients.All.UserLeft(username);
            }
            catch (UserNotFoundException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        public async Task SendMessage(GeneralMessage msg)
        {
            await Clients.All.MessageAdded(msg);
        }
    }
}