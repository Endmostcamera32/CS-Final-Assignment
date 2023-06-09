using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CS_chatApp.Hubs;

public class ChatHub : Hub
{
    public async void SendMessage(string user, string message, int channelId)
    {
        // await Clients.All.ReceiveMessage(message);
        Console.WriteLine("user: " + user);
        Console.WriteLine("Message: " + message);
        Console.WriteLine("Channel: " + channelId);
        await Clients.All.SendAsync("ReceiveMessages", user, message, channelId);
    }
    public override Task OnConnectedAsync()
    {
        Console.WriteLine("A Client Connected: " + Context.ConnectionId);
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        Console.WriteLine("A client disconnected: " + Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }
}