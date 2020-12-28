using System.Collections.Generic;
using System.Threading.Tasks;
using Chat.DTO;

namespace Chat.Hubs.Interfaces.Client
{
    public interface IClientChatActions
    {
        Task MessageAdded(MessageResult messageInput);

        Task UserJoined(string username);

        Task UserLeft(string username);

        Task SetConnectedUsers(IEnumerable<string> usernames);
    }
}