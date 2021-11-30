using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Size_Colors_Colors_ColorId",
                table: "Product_Size_Colors");

            migrationBuilder.DropIndex(
                name: "IX_Product_Size_Colors_ColorId",
                table: "Product_Size_Colors");

            migrationBuilder.DropColumn(
                name: "ColorId",
                table: "Product_Size_Colors");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Size_Colors_IdColor",
                table: "Product_Size_Colors",
                column: "IdColor");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Size_Colors_Colors_IdColor",
                table: "Product_Size_Colors",
                column: "IdColor",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Size_Colors_Colors_IdColor",
                table: "Product_Size_Colors");

            migrationBuilder.DropIndex(
                name: "IX_Product_Size_Colors_IdColor",
                table: "Product_Size_Colors");

            migrationBuilder.AddColumn<int>(
                name: "ColorId",
                table: "Product_Size_Colors",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_Size_Colors_ColorId",
                table: "Product_Size_Colors",
                column: "ColorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Size_Colors_Colors_ColorId",
                table: "Product_Size_Colors",
                column: "ColorId",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
