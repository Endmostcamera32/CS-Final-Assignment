using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CS_chatApp.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string? Text { get; set; }
        public string? FakeUserName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ChannelId { get; set; }
        public Channel? Channel { get; set; }
    }
}