using ReceiptProject.Endpoints.Internal;
using ReceiptProject.Models;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace ReceiptProject.Endpoints;

public class AuthorizationEndpoint : IEndpoints {

    public class LoginRequest
    {
        public string username {get; set;} = string.Empty;
        public string password {get; set;} = string.Empty;
    }

    public static void AddServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ReceiptDbContext>();
    }

    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        app.MapPost("login", (LoginRequest request, IConfiguration configuration) => {
            if(string.IsNullOrEmpty(request.username)){
                Console.WriteLine(request);
                return Results.BadRequest(400);
            }
            if(string.IsNullOrEmpty(request.password)){
                Console.WriteLine(request);
                return Results.BadRequest(400);
                
            }

            
            // Generate JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration["APISettings:Secret"]!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("userName", request.username),
                    new Claim("userID", request.password)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = configuration["Jwt:Issuer"],
                Audience = configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Results.Ok(
                new  {Token = tokenString}
            );

        });
    }
}