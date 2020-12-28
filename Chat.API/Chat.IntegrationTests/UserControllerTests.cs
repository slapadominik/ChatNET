using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Chat.DTO;
using Chat.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Xunit;

namespace Chat.IntegrationTests
{
    public class UserControllerTests
    {
        private readonly HttpClient _client;
        private readonly TestServer _server;

        public UserControllerTests()
        {
            // Arrange
            _server = new TestServer(new WebHostBuilder()
                .ConfigureAppConfiguration((context, builder) =>
                {
                    builder.AddJsonFile("appsettings.json");
                })
                .UseStartup<Startup>());
            _client = _server.CreateClient();
        }

        [Fact]
        public async Task CreateUser_ShouldReturnCreatedUser()
        {
            //Arrange
            var model = new UserInput {Username = "siema"};
            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            
            //Act
            var response = await _client.PostAsync("/api/user", stringContent);
            var responseModel = JsonConvert.DeserializeObject<User>(await response.Content.ReadAsStringAsync());

            // Assert
            response.EnsureSuccessStatusCode();
            responseModel.Username.Should().NotBeEmpty();
            responseModel.Token.Should().NotBeEmpty();
        }
    }
}
