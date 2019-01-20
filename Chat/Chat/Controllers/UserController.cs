using System;
using Chat.DTO;
using Chat.Exceptions;
using Chat.Models;
using Chat.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public ActionResult<User> CreateUser([FromBody] UserCredentials userCredentials)
        {
            throw new NotImplementedException();
        }

    }
}