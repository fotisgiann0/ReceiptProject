
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
                .Produces<IEnumerable<Product>>(200).WithTags("Product");

            app.MapGet("product/{id}", GetProductById)
                .WithName("GetProduct")
                .Produces<Product>(200)
                .Produces(404).WithTags("Product");

            app.MapGet("product/{id}/receipt_lines", GetReceiptLineByProduct)
                .Produces<IEnumerable<ReceiptLine>>(200)
                .Produces(404)
                .WithTags("Product");

            app.MapPut("product/{id}/{inv}/inventory", AddInventory)
                .WithName("AddInventory")
                .Produces<Product>(201)
                .Produces<IEnumerable<ValidationFailure>>(400).WithTags("Product");

            app.MapPost("product", AddProduct)
                .WithName("CreateProduct")
                .Accepts<Product>("application/json")
                .Produces<Product>(201)
                .Produces<IEnumerable<ValidationFailure>>(400).WithTags("Product");

            app.MapPut("product/{id}", AlterProduct)
                .WithName("UpdateProduct")
                .Accepts<Product>("application/json")
                .Produces<Product>(200)
                .Produces(404).WithTags("Product");

            app.MapPut("product_deleted/{id}", DeletedProduct)
              .WithName("DeletedProduct")
              .Accepts<Product>("application/json")
              .Produces<Product>(201)
              .Produces(404).WithTags("Product");

            app.MapDelete("product/{id}", DeleteProduct)
               .WithName("DeleteProduct")
               .Produces(204)
               .Produces(404).WithTags("Product");
        }

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
          ReceiptDbContext context, int id, int inv)
        {
            var forUpd = await context.Products.FindAsync(id);

            if (forUpd is null)
                return Results.NotFound();

           
            forUpd.Inventory = forUpd.Inventory + inv;
           


            await context.SaveChangesAsync();

            return Results.Created("AddInventory", forUpd);

        }
        internal static async Task<IResult> DeletedProduct(
      ReceiptDbContext context, int id, Product prod)
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
