using System.Threading.Tasks;
using Chat.DTO;

namespace Chat.Hubs.Interfaces.Server
{
    public interface IServerChatActions
    {
        Task SendMessage(GeneralMessage msg);
    }
}