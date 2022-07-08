using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "idPromotion",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "AvgRating",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "AvgRating",
                value: 5);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 5, 500000.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 5, 600000.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 5, 700000.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "AvgRating", "PricePromotion", "idPromotion" },
                values: new object[] { 5, 100000.0, null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "AvgRating",
                value: 5);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Categories");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "AvgRating",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "AvgRating",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "AvgRating",
                value: 1);

            migrationBuilder.InsertData(
                table: "Promotions",
                columns: new[] { "Id", "CreatedById", "CreatedDate", "Description", "EndDate", "Image", "IsMainBanner", "LastModified", "ModifiedById", "Name", "PublicId", "StartDate", "State", "Value" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "MEGA SALE 31-12", new DateTime(2021, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 0, null, null, "NEWYEAR3112", null, new DateTime(2021, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0.20000000000000001 },
                    { 2, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Women's Day 8-3", new DateTime(2022, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 0, null, null, "WOMANDAY", null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0.10000000000000001 },
                    { 3, 2, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tet Holiday 2022", new DateTime(2021, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 0, null, null, "TET999", null, new DateTime(2022, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0.20000000000000001 },
                    { 4, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Women Viet Nam 20-10-2021", new DateTime(2021, 10, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 0, null, null, "WOMANVN", null, new DateTime(2021, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0.10000000000000001 }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "idPromotion",
                value: 1);

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
        }
    }
}
