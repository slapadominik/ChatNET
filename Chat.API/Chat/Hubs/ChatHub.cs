using System;
using System.Linq;
using System.Threading.Tasks;
using Chat.DTO;
using Chat.Exceptions;
using Chat.Hubs.Interfaces.Client;
using Chat.Hubs.Interfaces.Server;
using Chat.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Chat.Hubs
{
    [Authorize]
    public class ChatHub : Hub<IClientChatActions>, IServerChatActions
    {
        private readonly IUserService _userService;
        private readonly ILogger _logger;


        public ChatHub(IUserService userService, ILogger<ChatHub> logger)
        {
            _userService = userService;
            _logger = logger;
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
                _logger.LogInformation($"User {username} joined chat. Online users: {connectedUsers.Count()}");
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError(ex, $"Failed connecting user to chat. Username {username} already taken.");
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
                _logger.LogInformation($"User {username} disconnected from chat.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, $"Failed disconnecting user {username} from chat.");
            }
        }

        public async Task SendMessage(MessageInput msg)
        {
            await Clients.All.MessageAdded(new MessageResult(msg.From, msg.Content, DateTime.Now));
        }
    }
}