using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace clothing_shop_website.Migrations
{
    public partial class DatabaseV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedById = table.Column<int>(type: "int", nullable: false),
                    ModifiedById = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Colors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ColorCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Log_Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProduct = table.Column<int>(type: "int", nullable: false),
                    IdSize = table.Column<int>(type: "int", nullable: false),
                    IdColor = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Log_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Promotions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<double>(type: "float", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedById = table.Column<int>(type: "int", nullable: false),
                    ModifiedById = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promotions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShopInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Wards = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeAccounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeCustomers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Point = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeCustomers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sku = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalBuy = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<double>(type: "float", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedById = table.Column<int>(type: "int", nullable: false),
                    ModifiedById = table.Column<int>(type: "int", nullable: true),
                    IdCategory = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_IdCategory",
                        column: x => x.IdCategory,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<int>(type: "int", nullable: false),
                    VerificationCode = table.Column<int>(type: "int", nullable: false),
                    IdTypeAccount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_TypeAccounts_IdTypeAccount",
                        column: x => x.IdTypeAccount,
                        principalTable: "TypeAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMain = table.Column<bool>(type: "bit", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    IdProduct = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Products_IdProduct",
                        column: x => x.IdProduct,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Product_Size_Colors",
                columns: table => new
                {
                    IdProduct = table.Column<int>(type: "int", nullable: false),
                    IdSize = table.Column<int>(type: "int", nullable: false),
                    IdColor = table.Column<int>(type: "int", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product_Size_Colors", x => new { x.IdProduct, x.IdSize, x.IdColor });
                    table.ForeignKey(
                        name: "FK_Product_Size_Colors_Colors_IdColor",
                        column: x => x.IdColor,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Product_Size_Colors_Products_IdProduct",
                        column: x => x.IdProduct,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Product_Size_Colors_Sizes_IdSize",
                        column: x => x.IdSize,
                        principalTable: "Sizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    IdAccount = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Point = table.Column<int>(type: "int", nullable: false),
                    IdTypeCustomer = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.IdAccount);
                    table.ForeignKey(
                        name: "FK_Customers_Accounts_IdAccount",
                        column: x => x.IdAccount,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Customers_TypeCustomers_IdTypeCustomer",
                        column: x => x.IdTypeCustomer,
                        principalTable: "TypeCustomers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    IdAccount = table.Column<int>(type: "int", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CardIdentity = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.IdAccount);
                    table.ForeignKey(
                        name: "FK_Staff_Accounts_IdAccount",
                        column: x => x.IdAccount,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    IdCustomer = table.Column<int>(type: "int", nullable: false),
                    IdProduct = table.Column<int>(type: "int", nullable: false),
                    IdSize = table.Column<int>(type: "int", nullable: false),
                    IdColor = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => new { x.IdCustomer, x.IdProduct, x.IdSize, x.IdColor });
                    table.ForeignKey(
                        name: "FK_Carts_Customers_IdCustomer",
                        column: x => x.IdCustomer,
                        principalTable: "Customers",
                        principalColumn: "IdAccount",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Wards = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCustomer = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryAddresses_Customers_IdCustomer",
                        column: x => x.IdCustomer,
                        principalTable: "Customers",
                        principalColumn: "IdAccount",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateOrder = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatePayment = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateShip = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalQuantity = table.Column<int>(type: "int", nullable: false),
                    TotalProductPrice = table.Column<double>(type: "float", nullable: false),
                    TotalAmount = table.Column<double>(type: "float", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    FeeDelivery = table.Column<double>(type: "float", nullable: false),
                    IdAddress = table.Column<int>(type: "int", nullable: false),
                    IdCustomer = table.Column<int>(type: "int", nullable: false),
                    IdPromotion = table.Column<int>(type: "int", nullable: true),
                    IdStaff = table.Column<int>(type: "int", nullable: true),
                    IdShipper = table.Column<int>(type: "int", nullable: true),
                    DeliveryAddressId = table.Column<int>(type: "int", nullable: true),
                    CustomerIdAccount = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerIdAccount",
                        column: x => x.CustomerIdAccount,
                        principalTable: "Customers",
                        principalColumn: "IdAccount",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_DeliveryAddresses_DeliveryAddressId",
                        column: x => x.DeliveryAddressId,
                        principalTable: "DeliveryAddresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Promotions_IdPromotion",
                        column: x => x.IdPromotion,
                        principalTable: "Promotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Staff_IdStaff",
                        column: x => x.IdStaff,
                        principalTable: "Staff",
                        principalColumn: "IdAccount",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    IdOrder = table.Column<int>(type: "int", nullable: false),
                    IdProduct = table.Column<int>(type: "int", nullable: false),
                    IdSize = table.Column<int>(type: "int", nullable: false),
                    IdColor = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    SizeId = table.Column<int>(type: "int", nullable: true),
                    ColorId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetails", x => new { x.IdOrder, x.IdProduct, x.IdSize, x.IdColor });
                    table.ForeignKey(
                        name: "FK_OrderDetails_Colors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Orders_IdOrder",
                        column: x => x.IdOrder,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Sizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "Sizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedById", "CreatedDate", "Image", "LastModified", "ModifiedById", "Name", "State" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Dress", 1 },
                    { 2, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Denim", 1 },
                    { 3, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Shirt", 1 },
                    { 4, 2, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Sweater", 1 },
                    { 5, 2, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, null, "Trousers", 0 }
                });

            migrationBuilder.InsertData(
                table: "Colors",
                columns: new[] { "Id", "ColorCode", "Name", "State" },
                values: new object[,]
                {
                    { 5, null, "Gray", 0 },
                    { 3, null, "Blue", 1 },
                    { 4, null, "Red", 1 },
                    { 1, null, "White", 1 },
                    { 2, null, "Black", 1 }
                });

            migrationBuilder.InsertData(
                table: "Log_Products",
                columns: new[] { "Id", "CreatedById", "CreatedDate", "IdColor", "IdProduct", "IdSize", "Quantity" },
                values: new object[,]
                {
                    { 9, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 5, 2, 100 },
                    { 15, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 11, 1, 100 },
                    { 14, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 10, 1, 100 },
                    { 13, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 9, 1, 100 },
                    { 11, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 7, 1, 100 },
                    { 10, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 6, 1, 100 },
                    { 8, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 5, 2, 100 },
                    { 12, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 8, 1, 100 },
                    { 6, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 3, 1, 100 },
                    { 5, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 2, 2, 100 },
                    { 4, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 2, 2, 100 },
                    { 7, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 4, 1, 100 },
                    { 3, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, 3, 100 },
                    { 2, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, 2, 100 },
                    { 1, 1, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, 1, 100 }
                });

            migrationBuilder.InsertData(
                table: "Promotions",
                columns: new[] { "Id", "CreatedById", "CreatedDate", "Description", "EndDate", "LastModified", "ModifiedById", "Name", "StartDate", "State", "Value" },
                values: new object[,]
                {
                    { 1, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tết Dương Lịch", new DateTime(2022, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, "TDL001", new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0.10000000000000001 },
                    { 2, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sinh nhật khách hàng", new DateTime(2022, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, "BIRDAY", new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 0.14999999999999999 },
                    { 3, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Quốc tế phụ nữ 08-03", new DateTime(2022, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, "WOMANDAY", new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 0.14999999999999999 },
                    { 4, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tết Âm Lịch", new DateTime(2022, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, "TET999", new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 0.20000000000000001 },
                    { 5, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Phụ Nữ Việt Nam 20-10", new DateTime(2022, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, "WOMANVN", new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 0.10000000000000001 }
                });

            migrationBuilder.InsertData(
                table: "ShopInfos",
                columns: new[] { "Id", "Address", "District", "Email", "Name", "Phone", "Province", "Wards" },
                values: new object[] { 1, "Số 1 Võ văn Ngân", "TP.Thủ Đức", null, "Mango Clothes", null, "TP.HCM", "Bình Thọ" });

            migrationBuilder.InsertData(
                table: "Sizes",
                columns: new[] { "Id", "Name", "State" },
                values: new object[,]
                {
                    { 1, "S", 1 },
                    { 2, "M", 1 },
                    { 3, "L", 1 },
                    { 4, "XL", 1 },
                    { 5, "XXL", 1 }
                });

            migrationBuilder.InsertData(
                table: "TypeAccounts",
                columns: new[] { "Id", "Name", "State" },
                values: new object[,]
                {
                    { 1, "Admin", 1 },
                    { 2, "Staff", 1 },
                    { 3, "Shipper", 1 },
                    { 4, "Customer", 1 }
                });

            migrationBuilder.InsertData(
                table: "TypeCustomers",
                columns: new[] { "Id", "Name", "Point", "State" },
                values: new object[,]
                {
                    { 1, "Gold", 0, 1 },
                    { 2, "Silver ", 0, 1 }
                });

            migrationBuilder.InsertData(
                table: "TypeCustomers",
                columns: new[] { "Id", "Name", "Point", "State" },
                values: new object[] { 3, "Bronze", 0, 1 });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "Email", "IdTypeAccount", "Password", "State", "VerificationCode" },
                values: new object[,]
                {
                    { 1, "Admin@gmail.com", 1, "123456789Abc!", 1, 1 },
                    { 8, "Custome2@gmail.com", 4, "123456789Abc!", 1, 1 },
                    { 7, "Customer@gmail.com", 4, "123456789Abc!", 1, 1 },
                    { 6, "Shipper2@gmail.com", 3, "123456789Abc!", 1, 1 },
                    { 5, "Shipper@gmail.com", 3, "123456789Abc!", 1, 1 },
                    { 11, "Shipper3@gmail.com", 2, "123456789Abc!", 0, 1 },
                    { 10, "Staff3@gmail.com", 2, "123456789Abc!", 0, 1 },
                    { 4, "Staff2@gmail.com", 2, "123456789Abc!", 1, 1 },
                    { 3, "Staff@gmail.com", 2, "123456789Abc!", 1, 1 },
                    { 2, "Admin2@gmail.com", 1, "123456789Abc!", 1, 1 },
                    { 9, "Custome3@gmail.com", 4, "123456789Abc!", 1, 1 },
                    { 12, "Custome4@gmail.com", 4, "123456789Abc!", 0, 1 }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CreatedById", "CreatedDate", "Description", "IdCategory", "LastModified", "ModifiedById", "Name", "Sku", "State", "TotalBuy", "UnitPrice" },
                values: new object[,]
                {
                    { 9, 3, new DateTime(2021, 11, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mella Khaki Pant is so pretty", 5, null, null, "Mella Khaki Pant", "123456781", 0, 10, 800000.0 },
                    { 8, 3, new DateTime(2021, 11, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hoodie is so pretty", 4, null, null, "Hoodie", "123456782", 1, 10, 100000.0 },
                    { 7, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Aokosor Sweaters is so pretty", 4, null, null, "Aokosor Sweaters", "123456783", 1, 10, 700000.0 },
                    { 11, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "T-Shirt is so pretty", 3, null, null, "T-Shirts", "123456779", 0, 10, 100000.0 },
                    { 6, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Yasmin Shirt is so pretty", 3, null, null, "Yasmin Shirt", "123456784", 1, 500, 600000.0 },
                    { 5, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mori Shirt is so pretty", 3, null, null, "Mori Shirt", "123456785", 1, 400, 500000.0 },
                    { 4, 4, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Short Jean is so pretty", 2, null, null, "Short Jean", "123456786", 1, 300, 400000.0 },
                    { 3, 4, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Baggy Jean is so pretty", 2, null, null, "Baggy Jean", "123456787", 1, 200, 300000.0 },
                    { 2, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ally Babydoll Dress is so pretty", 1, null, null, "Ally Babydoll Dress", "123456788", 1, 10, 200000.0 },
                    { 10, 3, new DateTime(2021, 11, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mochi Pants is so pretty", 5, null, null, "Mochi Pants", "123456780", 0, 10, 900000.0 },
                    { 1, 3, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Avocado Dress Set is so pretty", 1, null, null, "Avocado Dress Set", "123456789", 1, 100, 100000.0 }
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "IdAccount", "FirstName", "IdTypeCustomer", "Image", "LastName", "Point", "PublicId" },
                values: new object[,]
                {
                    { 12, "Hiệp", 1, null, "Nguyễn Đức", 300, null },
                    { 8, "Như", 2, null, "Huỳnh", 200, null },
                    { 7, "Tuấn", 3, null, "Võ Anh", 100, null },
                    { 9, "Ân", 1, null, "Trần Văn", 300, null }
                });

            migrationBuilder.InsertData(
                table: "Product_Size_Colors",
                columns: new[] { "IdColor", "IdProduct", "IdSize", "State", "Stock" },
                values: new object[,]
                {
                    { 1, 10, 1, 0, 100 },
                    { 1, 9, 1, 0, 100 },
                    { 1, 7, 1, 1, 100 },
                    { 1, 11, 1, 1, 100 },
                    { 1, 6, 1, 1, 100 },
                    { 1, 8, 1, 1, 100 },
                    { 3, 5, 2, 1, 100 },
                    { 1, 1, 2, 1, 100 },
                    { 1, 1, 3, 1, 100 },
                    { 4, 5, 2, 1, 100 },
                    { 2, 2, 2, 1, 100 },
                    { 1, 1, 1, 1, 100 },
                    { 4, 3, 1, 1, 100 },
                    { 2, 4, 1, 1, 100 },
                    { 3, 4, 1, 1, 100 },
                    { 3, 2, 2, 1, 100 }
                });

            migrationBuilder.InsertData(
                table: "Staff",
                columns: new[] { "IdAccount", "CardIdentity", "DateOfBirth", "FirstName", "Image", "LastName", "Phone", "PublicId" },
                values: new object[,]
                {
                    { 1, "123456786", null, "Giang", null, "Võ Hồng Tiên", "0328807778", null },
                    { 2, "123456787", null, "Thảo", null, "Nguyễn Thị", "0328807776", null },
                    { 4, "123456788", null, "Yến", null, "Lê Thị Ngọc", "0328807775", null },
                    { 10, "123456783", null, "Quân", null, "Gian Thiệu", "0328807771", null },
                    { 11, "123456782", null, "Thư", null, "Nguyễn Thị Minh", "0328807770", null },
                    { 5, "123456785", null, "Tiên", null, "Trần Thủy", "0328807773", null },
                    { 6, "123456784", null, "Nam", null, "Phạm Hoài", "0328807772", null },
                    { 3, "123456789", null, "Bảo", null, "Lê Nguyễn Gia", "0328807774", null }
                });

            migrationBuilder.InsertData(
                table: "Carts",
                columns: new[] { "IdColor", "IdCustomer", "IdProduct", "IdSize", "Quantity" },
                values: new object[,]
                {
                    { 1, 9, 9, 1, 20 },
                    { 1, 9, 8, 1, 20 },
                    { 1, 9, 7, 1, 20 },
                    { 1, 8, 6, 1, 20 },
                    { 3, 8, 5, 2, 20 },
                    { 1, 7, 1, 1, 20 },
                    { 2, 7, 2, 2, 20 },
                    { 4, 7, 3, 1, 20 },
                    { 2, 8, 4, 1, 20 }
                });

            migrationBuilder.InsertData(
                table: "DeliveryAddresses",
                columns: new[] { "Id", "Address", "District", "FirstName", "IdCustomer", "LastName", "Phone", "Province", "State", "Wards" },
                values: new object[,]
                {
                    { 1, "50/1 Đặng Văn Bi", "TP.Thủ Đức", "Tuấn", 7, "Võ Anh", "0324407774", "TP.HCM", 1, "Trường Thọ" },
                    { 6, "KTX Khu B", "TP.Thủ Đức", "Anh", 9, "Trần Thi Mai", "0324407776", "TP.HCM", 1, "Linh Trung" },
                    { 5, "50/1 Đặng Văn Bi", "TP.Thủ Đức", "Ân", 9, "Trần Văn", "0324407775", "TP.HCM", 1, "Trường Thọ" },
                    { 4, "46/64", "Quận 1", "Bảo", 8, "Lê Nguyễn Gia", "0324407771", "Đồng Nai", 1, "Phường 1" },
                    { 3, "KTX D2", "TP.Thủ Đức", "Như", 8, "Huỳnh", "0324407772", "TP.HCM", 1, "Tăng Nhơn Phú" },
                    { 8, "56/16", "Long Điền", "Hiệp", 12, "Nguyễn Đức", "0324407777", "Bà Rịa-Vũng Tàu", 1, "Phước Hưng" },
                    { 7, "KTX D2", "TP.Thủ Đức", "Hiệp", 12, "Nguyễn Đức", "0324407777", "TP.HCM", 1, "Tăng Nhơn Phú" },
                    { 2, "KTX Khu B", "TP.Thủ Đức", "Tú", 7, "Võ Anh", "0324407773", "TP.HCM", 1, "Linh Trung" }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "CustomerIdAccount", "DateOrder", "DatePayment", "DateShip", "DeliveryAddressId", "FeeDelivery", "IdAddress", "IdCustomer", "IdPromotion", "IdShipper", "IdStaff", "State", "TotalAmount", "TotalProductPrice", "TotalQuantity" },
                values: new object[,]
                {
                    { 11, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 4, 9, 1, 5, 3, 3, 15420000.0, 17100000.0, 30 },
                    { 10, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 4, 8, 1, 5, 3, 6, 17310000.0, 19200000.0, 30 },
                    { 9, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 4, 8, 1, 5, 3, 2, 17310000.0, 19200000.0, 30 },
                    { 8, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 4, 8, 1, 5, 3, 1, 17310000.0, 19200000.0, 30 },
                    { 7, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 4, 8, 1, 5, 3, 1, 17310000.0, 19200000.0, 30 },
                    { 5, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 4, 8, 1, 5, 3, 5, 17310000.0, 19200000.0, 30 },
                    { 4, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 4, 8, 1, 5, 3, 4, 17310000.0, 19200000.0, 30 },
                    { 3, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 3, 8, 1, 5, 3, 3, 7320000.0, 8100000.0, 20 },
                    { 2, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 2, 7, 1, 5, 3, 2, 15420000.0, 17100000.0, 30 },
                    { 1, null, new DateTime(2021, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 30000.0, 1, 7, 1, 5, 3, 1, 10830000.0, 12000000.0, 20 }
                });

            migrationBuilder.InsertData(
                table: "OrderDetails",
                columns: new[] { "IdColor", "IdOrder", "IdProduct", "IdSize", "ColorId", "ProductId", "Quantity", "SizeId", "UnitPrice" },
                values: new object[,]
                {
                    { 1, 1, 1, 1, null, null, 10, null, 320000.0 },
                    { 2, 1, 2, 2, null, null, 10, null, 280000.0 },
                    { 4, 2, 3, 1, null, null, 15, null, 250000.0 },
                    { 2, 2, 4, 1, null, null, 15, null, 320000.0 },
                    { 3, 3, 5, 2, null, null, 10, null, 220000.0 },
                    { 1, 3, 6, 1, null, null, 10, null, 195000.0 },
                    { 1, 4, 7, 1, null, null, 15, null, 320000.0 },
                    { 1, 4, 8, 1, null, null, 15, null, 320000.0 },
                    { 1, 5, 3, 1, null, null, 15, null, 250000.0 },
                    { 1, 5, 4, 1, null, null, 15, null, 320000.0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Email",
                table: "Accounts",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_IdTypeAccount",
                table: "Accounts",
                column: "IdTypeAccount");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_IdTypeCustomer",
                table: "Customers",
                column: "IdTypeCustomer");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddresses_IdCustomer",
                table: "DeliveryAddresses",
                column: "IdCustomer");

            migrationBuilder.CreateIndex(
                name: "IX_Images_IdProduct",
                table: "Images",
                column: "IdProduct");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ColorId",
                table: "OrderDetails",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ProductId",
                table: "OrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_SizeId",
                table: "OrderDetails",
                column: "SizeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerIdAccount",
                table: "Orders",
                column: "CustomerIdAccount");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryAddressId",
                table: "Orders",
                column: "DeliveryAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_IdPromotion",
                table: "Orders",
                column: "IdPromotion");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_IdStaff",
                table: "Orders",
                column: "IdStaff");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Size_Colors_IdColor",
                table: "Product_Size_Colors",
                column: "IdColor");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Size_Colors_IdSize",
                table: "Product_Size_Colors",
                column: "IdSize");

            migrationBuilder.CreateIndex(
                name: "IX_Products_IdCategory",
                table: "Products",
                column: "IdCategory");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Sku",
                table: "Products",
                column: "Sku",
                unique: true,
                filter: "[Sku] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Promotions_Name",
                table: "Promotions",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Staff_CardIdentity_Phone",
                table: "Staff",
                columns: new[] { "CardIdentity", "Phone" },
                unique: true,
                filter: "[CardIdentity] IS NOT NULL AND [Phone] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Log_Products");

            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "Product_Size_Colors");

            migrationBuilder.DropTable(
                name: "ShopInfos");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Colors");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Sizes");

            migrationBuilder.DropTable(
                name: "DeliveryAddresses");

            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "TypeCustomers");

            migrationBuilder.DropTable(
                name: "TypeAccounts");
        }
    }
}
