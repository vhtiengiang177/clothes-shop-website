using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Review_Customers_IdUser",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Orders_IdOrder",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Products_IdProduct",
                table: "Review");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Review",
                table: "Review");

            migrationBuilder.RenameTable(
                name: "Review",
                newName: "Reviews");

            migrationBuilder.RenameIndex(
                name: "IX_Review_IdProduct",
                table: "Reviews",
                newName: "IX_Reviews_IdProduct");

            migrationBuilder.RenameIndex(
                name: "IX_Review_IdOrder",
                table: "Reviews",
                newName: "IX_Reviews_IdOrder");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews",
                columns: new[] { "IdUser", "IdProduct", "IdOrder" });

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Customers_IdUser",
                table: "Reviews",
                column: "IdUser",
                principalTable: "Customers",
                principalColumn: "IdAccount",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Orders_IdOrder",
                table: "Reviews",
                column: "IdOrder",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Products_IdProduct",
                table: "Reviews",
                column: "IdProduct",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Customers_IdUser",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Orders_IdOrder",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Products_IdProduct",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reviews",
                table: "Reviews");

            migrationBuilder.RenameTable(
                name: "Reviews",
                newName: "Review");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_IdProduct",
                table: "Review",
                newName: "IX_Review_IdProduct");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_IdOrder",
                table: "Review",
                newName: "IX_Review_IdOrder");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Review",
                table: "Review",
                columns: new[] { "IdUser", "IdProduct", "IdOrder" });

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Customers_IdUser",
                table: "Review",
                column: "IdUser",
                principalTable: "Customers",
                principalColumn: "IdAccount",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Orders_IdOrder",
                table: "Review",
                column: "IdOrder",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Products_IdProduct",
                table: "Review",
                column: "IdProduct",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
