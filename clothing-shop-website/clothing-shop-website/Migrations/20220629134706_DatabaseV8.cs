using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 5, 80000.0, 1 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { 4, 200000.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { 4, 300000.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { 5, 400000.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 3, 400000.0, 1 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 3, 480000.0, 1 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 2, 560000.0, 1 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 4, 80000.0, 1 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { 1, 80000.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { 5, 900000.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "PricePromotion",
                value: 100000.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { null, 0.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { null, 0.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { null, 0.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { null, 0.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { null, 0.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "AvgRating", "PricePromotion" },
                values: new object[] { null, 0.0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "PricePromotion",
                value: 0.0);
        }
    }
}
