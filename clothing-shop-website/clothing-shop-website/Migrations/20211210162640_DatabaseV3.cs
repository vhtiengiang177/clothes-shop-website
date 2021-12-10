using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreate",
                table: "ShopInfos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 7,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Tuan", "Vo Anh" });

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 8,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Nhu", "Huynh" });

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 9,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "An", "Tran Van" });

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 12,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Hiep", "Nguyen Duc" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "50/1 Dang Van Bi Street", "Thu Duc City", "Tuan", "Vo Anh", "HCM City", "Truong Tho" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "District", "FirstName", "LastName", "Province" },
                values: new object[] { "Thu Duc City", "Tu", "Vo Anh", "HCM City" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "Thu Duc City", "Nhu", "Huynh", "HCM City", "Tang Nhon Phu" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "District", "FirstName", "LastName", "Province" },
                values: new object[] { "1", "Bao", "Le Nguyen Gia Bao", "Dong Nai" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Address", "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "50/1 Dang Van Bi Street", "Thu Duc City", "An", "Tran Van", "HCM City", "Truong Tho" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "District", "LastName", "Province" },
                values: new object[] { "Thu Duc City", "Tran Thi Mai", "HCM City" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "Thu Duc City", "Huyen", "Nguyen Thi", "HCM City", "Tang Nhon Phu" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "Long Dien", "Hiep", "Nguyen Duc", "Ba Ria- Vung Tau", "Phuoc Hung" });

            migrationBuilder.UpdateData(
                table: "ShopInfos",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "DateCreate", "District", "Email", "Phone", "Province", "Wards" },
                values: new object[] { "1 Vo Van Ngan Street", new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Thu Duc City", "mango.clothes2021@gmail.com", "+84 12 345 6789", "HCM City", "Binh Tho" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 1,
                column: "LastName",
                value: "Vo Hong Tien");

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 2,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Thao", "Nguyen Thi" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 3,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Bao", "Le Nguyen Gia" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 4,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Yen", "Le Thi Ngoc" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 5,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Tien", "Tran Thuy" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 6,
                column: "LastName",
                value: "Pham Hoai");

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 10,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Quan", "Gian Thieu" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 11,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Thu", "Nguyen Thi Minh" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreate",
                table: "ShopInfos");

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 7,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Tuấn", "Võ Anh" });

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 8,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Như", "Huỳnh" });

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 9,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Ân", "Trần Văn" });

            migrationBuilder.UpdateData(
                table: "Customers",
                keyColumn: "IdAccount",
                keyValue: 12,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Hiệp", "Nguyễn Đức" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "50/1 Đặng Văn Bi", "TP.Thủ Đức", "Tuấn", "Võ Anh", "TP.HCM", "Trường Thọ" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "District", "FirstName", "LastName", "Province" },
                values: new object[] { "TP.Thủ Đức", "Tú", "Võ Anh", "TP.HCM" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "TP.Thủ Đức", "Như", "Huỳnh", "TP.HCM", "Tăng Nhơn Phú" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "District", "FirstName", "LastName", "Province" },
                values: new object[] { "Quận 1", "Bảo", "Lê Nguyễn Gia", "Đồng Nai" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Address", "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "50/1 Đặng Văn Bi", "TP.Thủ Đức", "Ân", "Trần Văn", "TP.HCM", "Trường Thọ" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "District", "LastName", "Province" },
                values: new object[] { "TP.Thủ Đức", "Trần Thi Mai", "TP.HCM" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "TP.Thủ Đức", "Hiệp", "Nguyễn Đức", "TP.HCM", "Tăng Nhơn Phú" });

            migrationBuilder.UpdateData(
                table: "DeliveryAddresses",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "District", "FirstName", "LastName", "Province", "Wards" },
                values: new object[] { "Long Điền", "Hiệp", "Nguyễn Đức", "Bà Rịa-Vũng Tàu", "Phước Hưng" });

            migrationBuilder.UpdateData(
                table: "ShopInfos",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "District", "Email", "Phone", "Province", "Wards" },
                values: new object[] { "Số 1 Võ văn Ngân", "TP.Thủ Đức", null, null, "TP.HCM", "Bình Thọ" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 1,
                column: "LastName",
                value: "Võ Hồng Tiên");

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 2,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Thảo", "Nguyễn Thị" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 3,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Bảo", "Lê Nguyễn Gia" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 4,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Yến", "Lê Thị Ngọc" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 5,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Tiên", "Trần Thủy" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 6,
                column: "LastName",
                value: "Phạm Hoài");

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 10,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Quân", "Gian Thiệu" });

            migrationBuilder.UpdateData(
                table: "Staff",
                keyColumn: "IdAccount",
                keyValue: 11,
                columns: new[] { "FirstName", "LastName" },
                values: new object[] { "Thư", "Nguyễn Thị Minh" });
        }
    }
}
