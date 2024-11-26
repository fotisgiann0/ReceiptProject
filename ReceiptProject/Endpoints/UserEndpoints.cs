using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using ReceiptProject.Endpoints.Internal;
using ReceiptProject.Models;

namespace ReceiptProject.Endpoints
{
    public class UserEndpoints : IEndpoints
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ReceiptDbContext>();
        }

        public static void DefineEndpoints(IEndpointRouteBuilder app)
        {
            app.MapGet("users", GetUsers)
                .Produces<IEnumerable<Employee>>(200)
                .Produces(404).WithTags("User");
            app.MapGet("message", () => Results.Json("Hello World!")).WithTags("User");

            app.MapGet("users/{id}", GetUserById)
                .WithName("GetUser")
                .Produces<Employee>(200)
                .Produces(404).WithTags("User");

            app.MapGet("users/{id}/orders", GetReceiptByUser)
                 .WithName("GetOrderByUser")
                .Produces<IEnumerable<Receipt>>(200)
                .Produces(404).WithTags("User");

            app.MapPost("users", AddUser)
                .WithName("CreateUser")
                .Accepts<Employee>("application/json")
                .Produces<Employee>(201)
                .Produces(400).WithTags("User");

            app.MapDelete("users/{id}", DeleteUser)
                .WithName("DeletedUser")
                .Produces(204)
                .Produces(404).WithTags("User");

            app.MapPut("users/{id}", AlterUser)
                .WithName("UpdateUser")
                .Accepts<Employee>("application/json")
                .Produces<Employee>(201)
                .Produces(404).WithTags("User");
        }

        internal static async Task<IResult> GetUsers(
            ReceiptDbContext context)
        {
            var result = await context.Employees.ToListAsync();
            if (result is null)
                return Results.NotFound();
            return Results.Ok(result);
        }
        internal static async Task<IResult> GetUserById(
            ReceiptDbContext context, int id)
        {
            var result = await context.Employees.FindAsync(id);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        }

        internal static async Task<IResult> GetReceiptByUser(
            ReceiptDbContext context, int id)
        {
            var result = await context.Employees.FindAsync(id);

            if (result is null)
            {
                return Results.NotFound();
            }
            var filteredTitles = await context.Receipts
                   .Where(rec => rec.EmpId == id)
                   .ToListAsync();

            return  Results.Ok(filteredTitles);
        }
        internal static async Task<IResult> AddUser(
            ReceiptDbContext context, Employee user)
        {
            await context.Employees.AddAsync(user);

            await context.SaveChangesAsync();

            return Results.CreatedAtRoute("CreateUser", user);

        }
        internal static async Task<IResult> DeleteUser(
            ReceiptDbContext context, int id)
        {
            var forDel = await context.Employees.FindAsync(id);

            if (forDel is null)
                return Results.NotFound();

            context.Employees.Remove(forDel);

            await context.SaveChangesAsync();

            return Results.NoContent();

        }
        internal static async Task<IResult> AlterUser(
           ReceiptDbContext context, int id, Employee user)
        {
            var forUpd = await context.Employees.FindAsync(id);

            if (forUpd is null)
                return Results.NotFound();

            forUpd.Username = user.Username;
            forUpd.Firstname = user.Firstname;
            forUpd.Lastname = user.Lastname;
            
            await context.SaveChangesAsync();

            return Results.CreatedAtRoute("UpdateUser", forUpd);

        }
    }
}
