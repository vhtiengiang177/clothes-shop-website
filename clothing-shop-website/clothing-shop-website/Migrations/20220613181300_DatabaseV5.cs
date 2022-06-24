using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    IdProduct = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    IdOrder = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => new { x.IdUser, x.IdProduct, x.IdOrder });
                    table.ForeignKey(
                        name: "FK_Review_Customers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "Customers",
                        principalColumn: "IdAccount",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Review_Orders_IdOrder",
                        column: x => x.IdOrder,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Review_Products_IdProduct",
                        column: x => x.IdProduct,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Review_IdOrder",
                table: "Review",
                column: "IdOrder");

            migrationBuilder.CreateIndex(
                name: "IX_Review_IdProduct",
                table: "Review",
                column: "IdProduct");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Review");
        }
    }
}
