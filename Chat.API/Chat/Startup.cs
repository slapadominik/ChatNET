using System.Text;
using System.Threading.Tasks;
using Chat.Helpers;
using Chat.Hubs;
using Chat.Services;
using Chat.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Chat
{
    public class Startup
    {
        private readonly string FrontEndOrigin = "_frontEndOrigin";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            ConfigureAuthentication(services, appSettingsSection);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddCors(options =>
            {
                options.AddPolicy(name: FrontEndOrigin,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000", "https://chatnet1.azurewebsites.net")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });

            services.AddSignalR();
            services.AddSingleton<IUserService, UserService>();
            services.AddTransient<ISecurityService, SecurityService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(FrontEndOrigin);

            app.UseAuthentication();

            app.UseSignalR(route =>
            {
                route.MapHub<ChatHub>("/hubs/chat");
            });

            app.UseMvc();
        }

        private void ConfigureAuthentication(IServiceCollection services, IConfigurationSection appSettingsSection)
        {
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services.AddAuthentication(options => 
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options => {
                    options.TokenValidationParameters =
                        new TokenValidationParameters
                        {
                            ValidateAudience = false,
                            ValidateIssuer = false,
                            ValidateActor = false,
                            ValidateLifetime = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key)
                        };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                (path.StartsWithSegments("/hubs/chat")))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });
        }
    }
}
