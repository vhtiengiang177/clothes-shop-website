using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ColorCode",
                table: "Colors");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Categories");

            migrationBuilder.InsertData(
                table: "Images",
                columns: new[] { "Id", "IdProduct", "PublicId", "State", "Url" },
                values: new object[,]
                {
                    { 1, 7, "upkgtzzikelofkm59hym", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377326/upkgtzzikelofkm59hym.jpg" },
                    { 2, 8, "nyui0gbxjklueygs79t3", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377339/nyui0gbxjklueygs79t3.jpg" },
                    { 3, 6, "hwyrx7fngep248l9sgok", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377352/hwyrx7fngep248l9sgok.jpg" },
                    { 4, 5, "wljzh5o9z4lijmkpz6g9", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377360/wljzh5o9z4lijmkpz6g9.jpg" },
                    { 5, 4, "vhaaahd0swocol1jmdzb", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377369/vhaaahd0swocol1jmdzb.jpg" },
                    { 6, 3, "zrziv9gpeusmhtxsfkjt", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377386/zrziv9gpeusmhtxsfkjt.jpg" },
                    { 7, 3, "gspnzsvax2tzcrnqu6qz", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377387/gspnzsvax2tzcrnqu6qz.jpg" },
                    { 8, 3, "jyekdiysmfp2y4jdy4py", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377387/jyekdiysmfp2y4jdy4py.jpg" },
                    { 9, 2, "hbsloasmry0visw71kom", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377395/hbsloasmry0visw71kom.jpg" },
                    { 10, 1, "rg2fwfca5dcqfdkarnxv", 1, "https://res.cloudinary.com/djl6vmqt7/image/upload/v1640377407/rg2fwfca5dcqfdkarnxv.jpg" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Images",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Images",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ColorCode",
                table: "Colors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
