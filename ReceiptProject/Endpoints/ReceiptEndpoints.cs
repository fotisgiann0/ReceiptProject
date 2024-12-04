using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ReceiptProject.Data;
using ReceiptProject.Endpoints.Internal;
using ReceiptProject.Models;
using System.Text.Json.Nodes;

namespace ReceiptProject.Endpoints
{
    public class ReceiptEndpoints : IEndpoints
    {
        public static void AddServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ReceiptDbContext>();
        }

        public static void DefineEndpoints(IEndpointRouteBuilder app)
        {

            app.MapGet("registers", GetRegister)
                .Produces<IEnumerable<CashRegister>>(200).WithTags("Register");

            app.MapGet("receipts", GetOrderLinesAsync)
                 .Produces<IEnumerable<Receipt>>(200)
                 .Produces(404).WithTags("Receipt");

            app.MapGet("receipts/{id}", GetBasedOnOrder)
                .WithName("GetReceipt")
                .Produces<Receipt>(200)
                .Produces(404).WithTags("Receipt");

            app.MapGet("receipts/{id}/lines", GetLineBasedOnOrder)
               .WithName("GetReceiptLines")
               .Produces<ReceiptLine>(200)
               .Produces(404).WithTags("Receipt");


            app.MapPost("receipts", AddAnOrderTesting)
                .WithName("CreateReceipt")
                .Accepts<InsertReceipt>("application/json")
                .Produces<Receipt>(201)
                .Produces(400).WithTags("Receipt");

            app.MapDelete("receipts/{id}", DeleteReceipt)
               .WithName("DeleteReceipt")
               .Produces(204)
               .Produces(404).WithTags("Receipt");

            //app.MapPut("receipt/{id}", AlterReceipt)
            //    .WithName("UpdateReceipt")
            //    .Accepts<Receipt>("application/json")
            //    .Produces<Receipt>(201)
            //    .Produces(404).WithTags("Receipt");

            //app.MapGet("all_receipt_lines", GetReceiptLines);

            
            //app.MapPost("receipt", AddAnOrder)
            //    .WithName("CreateReceipt")
            //    .Accepts<Receipt>("application/json")
            //    .Produces<Receipt>(201)
            //    .Produces<IEnumerable<ValidationFailure>>(400).WithTags("Receipt");



        }
        internal static async Task<IResult> GetOrderLinesAsync(
           ReceiptDbContext context)
        {
            var result = await context.Receipts
                .Include(p => p.ReceiptLines).ToListAsync();

            if (result is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(result);

        }
        
        internal static async Task<IResult> GetRegister(
           ReceiptDbContext context)
        {
            var result = await context.CashRegisters.ToListAsync();
            if(result is null)
            {
                return Results.NotFound();
            }

        
            return Results.Ok(result);
        }

        internal static async Task<IResult> GetBasedOnOrder(
             ReceiptDbContext context, int id)
        {
            var rec = await context.Receipts.FindAsync(id);

            if(rec  is null)
            {
                return Results.NotFound();
            }

            var result = await context.Receipts
                .Include(p => p.ReceiptLines).Where(p => p.OrderId == id).ToListAsync();
                       
            return Results.Ok(result);

        }

        internal static async Task<IResult> GetLineBasedOnOrder(
             ReceiptDbContext context, int id)
        {
            var rec = await context.Receipts.FindAsync(id);

            if (rec is null)
            {
                return Results.NotFound();
            }

            var result = await context.ReceiptLines
                .Include(p => p.Product).Where(p => p.OrderId == id).ToListAsync();


            //var result = await context.results.FindAsync(id);
            return Results.Ok(result);

        }


        [Authorize]
        internal static async Task<IResult> AddAnOrderTesting(
            ReceiptDbContext context, InsertReceipt order)
        {
            // await context.Receipt.AddAsync(order);

            //int newOrdId = context.Receipts.Max(u => u.OrderId) + 1;

           

            Receipt receipt = new Receipt()
            {
                RegisterId = order.RegisterId,
                EmpId = order.EmpId,
                RecTime = order.RecTime,
                Freight = 0,
                Fpa = 0,
                TotalCost = 0,
                PaymentType = order.PaymentType,
                ReceiptLines = order.ReceiptLines


            };

            decimal fpa_sum = 0;
            decimal freight_sum = 0;

            foreach (ReceiptLine rec_line in receipt.ReceiptLines)
            {
                var prod = await context.Products.FindAsync(rec_line.ProductId);
                rec_line.Fpa = prod.FpaCategory;
                rec_line.Freight = prod.Price * rec_line.Quantity.Value;
                fpa_sum += rec_line.Freight.Value * rec_line.Fpa.Value / 100;// * rec_line.Quantity.Value / 100;
                freight_sum += rec_line.Freight.Value;// * rec_line.Quantity.Value;
                prod.Inventory -= rec_line.Quantity;

                // context.Products.Update(prod);
                await context.SaveChangesAsync();
            }
            receipt.Fpa = fpa_sum;
            receipt.Freight = freight_sum;
            receipt.TotalCost = fpa_sum + freight_sum;
            await context.Receipts.AddAsync(receipt);

            
            await context.SaveChangesAsync();


            return Results.Created("CreateReceipt", receipt);

        }
        
        internal static async Task<IResult> DeleteReceipt(
            ReceiptDbContext context, int id)
        {
            var forDel = await context.Receipts.FindAsync(id);

            if (forDel is null)
                return Results.NotFound();
           

            context.Receipts.Remove(forDel);

            await context.SaveChangesAsync();

            return Results.NoContent();

        }
        //internal static async Task<IResult> AlterReceipt(
        // ReceiptDbContext context, int id, Receipt receipt)
        //{
        //    var forUpd = await context.Receipts.FindAsync(id);

        //    if (forUpd is null)
        //        return Results.NotFound();

        //    forUpd.ProdDescription = prod.ProdDescription;
        //    forUpd.Price = prod.Price;
        //    forUpd.FpaCategory = prod.FpaCategory;
        //    forUpd.Inventory = prod.Inventory;
        //    forUpd.IsDeleted = prod.IsDeleted;


        //    await context.SaveChangesAsync();

        //    return Results.Ok(forUpd);

        //}
        //internal static async Task<IResult> AddAnOrder(
        //    ReceiptDbContext context, Receipt order)
        //{
        //    await context.Receipts.AddAsync(order);

        //    decimal fpa_sum = 0;
        //    decimal freight_sum = 0;

        //    foreach (ReceiptLine rec_line in order.ReceiptLines)
        //    {
        //        var prod = await context.Products.FindAsync(rec_line.ProductId);
        //        rec_line.Fpa = prod.FpaCategory;
        //        rec_line.Freight = prod.Price * rec_line.Quantity;                             
        //        fpa_sum += rec_line.Freight.Value * rec_line.Fpa.Value / 100;
        //        freight_sum += rec_line.Freight.Value;


        //    }
        //    order.Fpa = fpa_sum;
        //    order.Freight = freight_sum;
        //    order.TotalCost= fpa_sum + freight_sum;

        //    await context.SaveChangesAsync();


        //    return Results.Ok(order);

        //}
       // internal static async Task<IResult> GetReceiptLines(
       //ReceiptDbContext context)
       // {
       //     return Results.Ok(await context.ReceiptLines.ToListAsync());
       // }
    }
}
