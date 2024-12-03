
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReceiptProject.Endpoints.Internal;
using ReceiptProject.Models;

namespace ReceiptProject.Endpoints
{
    public class ProductEndpoints : IEndpoints
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ReceiptDbContext>();
        }

        public static void DefineEndpoints(IEndpointRouteBuilder app)
        {
            app.MapGet("products", GetProducts)
                .Produces<IEnumerable<Product>>(200)
                .Produces(404).WithTags("Product");

            app.MapGet("products/{id}", GetProductById)
                .WithName("GetProduct")
                .Produces<Product>(200)
                .Produces(404).WithTags("Product");

            app.MapGet("products/{id}/lines", GetReceiptLineByProduct)
                .Produces<IEnumerable<ReceiptLine>>(200)
                .Produces(404)
                .WithTags("Product");

            app.MapPut("products/{id}/inventory/{items}", AddInventory)
                .WithName("AddInventory")
                .Produces<Product>(201)
                .Produces(404)
                .Produces(422).WithTags("Product");

            app.MapPost("products", AddProduct)
                .WithName("CreateProduct")
                .Accepts<Product>("application/json")
                .Produces<Product>(201)              
                .Produces(400).WithTags("Product");

            app.MapPut("products/{id}", AlterProduct)
                .WithName("UpdateProduct")
                .Accepts<Product>("application/json")
                .Produces<Product>(201)
                .Produces(404).WithTags("Product");

            app.MapPut("products/{id}/deleted", DeletedProduct)
              .WithName("DeletedProduct")
              .Accepts<Product>("application/json")
              .Produces<Product>(201)
              .Produces(404).WithTags("Product");

            app.MapDelete("products/{id}", DeleteProduct)
               .WithName("DeleteProduct")
               .Produces(204)
               .Produces(404).WithTags("Product");
        }

        [Authorize]
        internal static async Task<IResult> GetProducts(
          ReceiptDbContext context)
        {
            return Results.Ok(await context.Products.ToListAsync());
        }

        internal static async Task<IResult> AddProduct(
            ReceiptDbContext context, Product prod)
        {
            await context.Products.AddAsync(prod);

            await context.SaveChangesAsync();

            return Results.CreatedAtRoute("CreateProduct", prod);

        }
        internal static async Task<IResult> GetReceiptLineByProduct(
             ReceiptDbContext context, int id)
        {
            var result = await context.Products.FindAsync(id);
            if(result is null)
            {
                return Results.NotFound();
            }
            var filteredTitles = await context.ReceiptLines
                   .Where(rec => rec.ProductId == id)
                   .ToListAsync();


            return Results.Ok(filteredTitles);

        }
        internal static async Task<IResult> GetProductById(
            ReceiptDbContext context, int id)
        {
            var result = await context.Products.FindAsync(id);
            return result is not null ? Results.Ok(result) : Results.NotFound();

        }
        internal static async Task<IResult> AlterProduct(
          ReceiptDbContext context, int id,  Product prod)
        {
            var forUpd = await context.Products.FindAsync(id);

            if (forUpd is null)
                return Results.NotFound();

            forUpd.ProdDescription = prod.ProdDescription;
            forUpd.Price = prod.Price;
            forUpd.FpaCategory = prod.FpaCategory;
            forUpd.Inventory = prod.Inventory;
            forUpd.IsDeleted = prod.IsDeleted;


            await context.SaveChangesAsync();

            return Results.Created("UpdateProduct",forUpd);

        }
        internal static async Task<IResult> AddInventory(
          ReceiptDbContext context, int id, int items)
        {
            var forUpd = await context.Products.FindAsync(id);

            if (forUpd is null)
                return Results.NotFound();

            if(forUpd.Inventory + items < 0)
            {
                return Results.BadRequest(422);
            }
         
            forUpd.Inventory = forUpd.Inventory + items;
           
            await context.SaveChangesAsync();

            return Results.Created("AddInventory", forUpd);

        }
        internal static async Task<IResult> DeletedProduct(
      ReceiptDbContext context, int id)
        {
            var forUpd = await context.Products.FindAsync(id);

            if (forUpd is null)
                return Results.NotFound();

            forUpd.IsDeleted = true;

            await context.SaveChangesAsync();

            return Results.Ok(forUpd);

        }
        internal static async Task<IResult> DeleteProduct(
     ReceiptDbContext context, int id)
        {
            var forDel = await context.Products.FindAsync(id);

            if (forDel is null)
                return Results.NotFound();

            context.Products.Remove(forDel);

            await context.SaveChangesAsync();

            return Results.NoContent();

        }
    }
}
