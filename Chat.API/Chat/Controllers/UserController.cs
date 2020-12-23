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
        public ActionResult<User> CreateUser([FromBody] UserViewModel userViewModel)
        {
            try
            {
                var user = _userService.CreateUser(userViewModel.Username);
                return StatusCode(201, user);
            }
            catch (UsernameIsTakenException ex)
            {
                return StatusCode(409, ex.Message);
            }
        }
        
    }
}