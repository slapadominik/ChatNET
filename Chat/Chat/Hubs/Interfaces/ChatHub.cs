using System;
using System.Threading.Tasks;
using Chat.DTO;
using Chat.Exceptions;
using Chat.Hubs.Interfaces.Client;
using Chat.Hubs.Interfaces.Server;
using Chat.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Hubs.Interfaces
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
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        public Task SendMessage(GeneralMessage msg)
        {
            throw new NotImplementedException();
        }
    }
}