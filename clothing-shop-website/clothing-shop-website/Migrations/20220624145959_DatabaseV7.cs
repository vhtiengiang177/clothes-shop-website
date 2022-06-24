using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvgRating",
                table: "Products",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvgRating",
                table: "Products");
        }
    }
}
