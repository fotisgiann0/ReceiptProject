using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReceiptProject.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CashRegisters",
                columns: table => new
                {
                    register_id = table.Column<int>(type: "int", nullable: false),
                    register_description = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CashRegi__1418262FD182AEF6", x => x.register_id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    emp_id = table.Column<int>(type: "int", nullable: false),
                    username = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    firstname = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    lastname = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__1299A861FC1C0943", x => x.emp_id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    prod_description = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    price = table.Column<decimal>(type: "money", nullable: true),
                    fpa_category = table.Column<int>(type: "int", nullable: true),
                    inventory = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Products__47027DF5991514F9", x => x.product_id);
                });

            migrationBuilder.CreateTable(
                name: "Receipts",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    register_id = table.Column<int>(type: "int", nullable: true),
                    emp_id = table.Column<int>(type: "int", nullable: true),
                    rec_time = table.Column<DateTime>(type: "datetime", nullable: true),
                    freight = table.Column<decimal>(type: "money", nullable: true),
                    fpa = table.Column<decimal>(type: "money", nullable: true),
                    total_cost = table.Column<decimal>(type: "money", nullable: true),
                    payment_type = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Receipts__46596229B7919EEC", x => x.order_id);
                    table.ForeignKey(
                        name: "fk_emp",
                        column: x => x.emp_id,
                        principalTable: "Employees",
                        principalColumn: "emp_id");
                    table.ForeignKey(
                        name: "fk_register",
                        column: x => x.register_id,
                        principalTable: "CashRegisters",
                        principalColumn: "register_id");
                });

            migrationBuilder.CreateTable(
                name: "ReceiptLines",
                columns: table => new
                {
                    inst_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: true),
                    product_id = table.Column<int>(type: "int", nullable: true),
                    freight = table.Column<decimal>(type: "money", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: true),
                    fpa = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ReceiptL__0206940D08078E8A", x => x.inst_id);
                    table.ForeignKey(
                        name: "fk_order",
                        column: x => x.order_id,
                        principalTable: "Receipts",
                        principalColumn: "order_id");
                    table.ForeignKey(
                        name: "fk_prod",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptLines_order_id",
                table: "ReceiptLines",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptLines_product_id",
                table: "ReceiptLines",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_emp_id",
                table: "Receipts",
                column: "emp_id");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_register_id",
                table: "Receipts",
                column: "register_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReceiptLines");

            migrationBuilder.DropTable(
                name: "Receipts");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "CashRegisters");
        }
    }
}
