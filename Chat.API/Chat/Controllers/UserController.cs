﻿using System;
using Chat.DTO;
using Chat.Exceptions;
using Chat.Models;
using Chat.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
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
            try
            {
                var user = _userService.CreateUser(userCredentials.Username);
                return StatusCode(201, user);
            }
            catch (UsernameIsTakenException ex)
            {
                return StatusCode(409, ex.Message);
            }
        }
        
    }
}