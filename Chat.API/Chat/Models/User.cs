using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Chat.Models
{
    public class User 
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
    }
}
