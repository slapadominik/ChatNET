using System;

namespace Chat.Entity
{
    public class User 
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
    }
}
