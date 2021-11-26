using Domain.Entity;
using Microsoft.EntityFrameworkCore;
using System;

namespace Infrastructure.Persistent
{
    public class DataDbContext : DbContext
    {
        public DataDbContext()
        {
        }

        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<DeliveryAddress> DeliveryAddresses { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Log_Product> Log_Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Product_Size_Color> Product_Size_Colors { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<ShopInfo> ShopInfos { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<TypeAccount> TypeAccounts { get; set; }
        public DbSet<TypeCustomer> TypeCustomers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasIndex(e => e.Email)
                        .IsUnique();

                entity.HasOne<TypeAccount>(e => e.TypeAccount)
                        .WithMany(typeaccount => typeaccount.Accounts)
                        .HasForeignKey(e => e.IdTypeAccount);

                entity.HasOne<Customer>(e => e.Customer)
                      .WithOne(customer => customer.Account)
                      .HasForeignKey<Customer>(customer => customer.IdAccount)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne<Staff>(e => e.Staff)
                      .WithOne(staff => staff.Account)
                      .HasForeignKey<Staff>(staff => staff.IdAccount)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Cart>(entity => {
                entity.HasKey(e => new { e.IdCustomer, e.IdProduct, e.IdSize, e.IdColor });

                entity.HasOne<Customer>(e => e.Customer)
                    .WithMany(c => c.Carts)
                    .HasForeignKey(e => e.IdCustomer);
                // Như kiểu 1 khách hàng mua dc nhiều sp
            });

            modelBuilder.Entity<Category>(entity => {
                entity.HasKey(e => e.Id);
              
                entity.HasMany<Product>(e => e.Products)
                      .WithOne(product => product.Category)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Color>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasIndex(e => e.ColorCode)
                     .IsUnique();
            });

            modelBuilder.Entity<Customer>(entity => {
                entity.HasKey(e => e.IdAccount);

                entity.HasOne<TypeCustomer>(e => e.TypeCustomer)
                        .WithMany(typecustomer => typecustomer.Customers)
                        .HasForeignKey(e => e.IdTypeCustomer)
                        .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany<DeliveryAddress>(e => e.DeliveryAddresses)
                      .WithOne(deliveryaddress => deliveryaddress.Customer)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<DeliveryAddress>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasOne<Customer>(da => da.Customer)
                       .WithMany(customer => customer.DeliveryAddresses)
                       .HasForeignKey(e => e.IdCustomer)
                       .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Image>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasOne<Product>(e => e.Product)
                       .WithMany(product => product.Images)
                       .HasForeignKey(e => e.IdProduct);
            });

            modelBuilder.Entity<Log_Product>(entity => {
                entity.HasKey(e => new { e.Id});
            });

            modelBuilder.Entity<Order>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasOne<Promotion>(e => e.Promotion)
                        .WithMany(promotion => promotion.Orders)
                        .HasForeignKey(e => e.IdPromotion)
                        .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany<OrderDetail>(e => e.OrderDetails)
                        .WithOne(orderdetail => orderdetail.Order);

                entity.HasOne<Staff>(e => e.Staff)
                        .WithMany(staff => staff.Orders)
                        .HasForeignKey(e => e.IdStaff);
            });

            modelBuilder.Entity<OrderDetail>(entity => {
                entity.HasKey(e => new { e.IdOrder, e.IdProduct, e.IdSize, e.IdColor });

                entity.HasOne<Order>(e => e.Order)
                       .WithMany(order => order.OrderDetails)
                       .HasForeignKey(e => e.IdOrder)
                       .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Product>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasIndex(e => e.Sku)
                        .IsUnique();

                entity.HasOne<Category>(e => e.Category)
                        .WithMany(category => category.Products)
                        .HasForeignKey(e => e.IdCategory);

                entity.HasMany<Image>(e => e.Images)
                      .WithOne(image => image.Product);

            });


            modelBuilder.Entity<Product_Size_Color>(entity => {
                entity.HasKey(e => new { e.IdProduct, e.IdSize, e.IdColor });

                entity.HasOne<Product>(e => e.Product)
                        .WithMany(product => product.Product_Sizes)
                        .HasForeignKey(e => e.IdProduct);

                entity.HasOne<Size>(e => e.Size)
                        .WithMany(size => size.Product_Sizes)
                        .HasForeignKey(e => e.IdSize);
            });

            modelBuilder.Entity<Promotion>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasMany<Order>(e => e.Orders)
                         .WithOne(order => order.Promotion)
                         .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ShopInfo>(entity => {
                entity.HasKey(si => si.Id);
            });

            modelBuilder.Entity<Size>(entity => {
                entity.HasKey(e => e.Id);
            });

            modelBuilder.Entity<Staff>(entity => {
                entity.HasKey(e => e.IdAccount);

                entity.HasIndex(e => new { e.CardIdentity, e.Phone })
                       .IsUnique();
            });


            modelBuilder.Entity<TypeAccount>(entity => {
                entity.HasKey(e => e.Id);
                entity.HasMany<Account>(e => e.Accounts)
                        .WithOne(account => account.TypeAccount)
                        .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<TypeCustomer>(entity => {
                entity.HasKey(e => e.Id);
                entity.HasMany<Customer>(e => e.Customers)
                        .WithOne(customer => customer.TypeCustomer)
                        .OnDelete(DeleteBehavior.Cascade);
            });

            SeedData(modelBuilder);
        }

        public void SeedData(ModelBuilder modelBuilder)
        {
            DateTime createdDate = new DateTime(2021, 07, 10);
            DateTime createdDateNew = new DateTime(2021, 11, 11);
            DateTime endDate = new DateTime(2022, 7, 15);

            modelBuilder.Entity<ShopInfo>().HasData(
                new ShopInfo() { Id = 1, Name = "Mango Clothes", Address = "Số 1 Võ văn Ngân", Wards = "Bình Thọ", District = "TP.Thủ Đức", Province = "TP.HCM" });

            modelBuilder.Entity<TypeAccount>().HasData(
                new TypeAccount() { Id = 1, Name = "Admin", State = 1 },
                new TypeAccount() { Id = 2, Name = "Staff", State = 1 },
                new TypeAccount() { Id = 3, Name = "Shipper", State = 1 },
                new TypeAccount() { Id = 4, Name = "Customer", State = 1 });

            modelBuilder.Entity<Account>().HasData(
                new Account() { Id = 1, Email = "Admin@gmail.com", Password = "123456789Abc!", IdTypeAccount = 1, State = 1, VerificationCode = 1 },
                new Account() { Id = 2, Email = "Admin2@gmail.com", Password = "123456789Abc!", IdTypeAccount = 1, State = 1, VerificationCode = 1 },
                new Account() { Id = 3, Email = "Staff@gmail.com", Password = "123456789Abc!", IdTypeAccount = 2, State = 1, VerificationCode = 1 },
                new Account() { Id = 4, Email = "Staff2@gmail.com", Password = "123456789Abc!", IdTypeAccount = 2, State = 1, VerificationCode = 1 },
                new Account() { Id = 5, Email = "Shipper@gmail.com", Password = "123456789Abc!", IdTypeAccount = 3, State = 1, VerificationCode = 1 },
                new Account() { Id = 6, Email = "Shipper2@gmail.com", Password = "123456789Abc!", IdTypeAccount = 3, State = 1, VerificationCode = 1 },
                new Account() { Id = 7, Email = "Customer@gmail.com", Password = "123456789Abc!", IdTypeAccount = 4, State = 1, VerificationCode = 1 },
                new Account() { Id = 8, Email = "Custome2@gmail.com", Password = "123456789Abc!", IdTypeAccount = 4, State = 1, VerificationCode = 1 },
                new Account() { Id = 9, Email = "Custome3@gmail.com", Password = "123456789Abc!", IdTypeAccount = 4, State = 1, VerificationCode = 1 },
                new Account() { Id = 10, Email = "Staff3@gmail.com", Password = "123456789Abc!", IdTypeAccount = 2, State = 0, VerificationCode = 1 },
                new Account() { Id = 11, Email = "Shipper3@gmail.com", Password = "123456789Abc!", IdTypeAccount = 2, State = 0, VerificationCode = 1 },
                new Account() { Id = 12, Email = "Custome4@gmail.com", Password = "123456789Abc!", IdTypeAccount = 4, State = 0, VerificationCode = 1 });

            modelBuilder.Entity<Staff>().HasData(
                new Staff() { IdAccount = 1, FirstName = "Giang", LastName = "Võ Hồng Tiên", CardIdentity = "123456786", Phone = "0328807778" },
                new Staff() { IdAccount = 2, FirstName = "Thảo", LastName = "Nguyễn Thị", CardIdentity = "123456787", Phone = "0328807776" },
                new Staff() { IdAccount = 3, FirstName = "Bảo", LastName = "Lê Nguyễn Gia", CardIdentity = "123456789", Phone = "0328807774" },
                new Staff() { IdAccount = 4, FirstName = "Yến", LastName = "Lê Thị Ngọc", CardIdentity = "123456788", Phone = "0328807775" },
                new Staff() { IdAccount = 5, FirstName = "Tiên", LastName = "Trần Thủy", CardIdentity = "123456785", Phone = "0328807773" },
                new Staff() { IdAccount = 6, FirstName = "Nam", LastName = "Phạm Hoài", CardIdentity = "123456784", Phone = "0328807772" },
                new Staff() { IdAccount = 10, FirstName = "Quân", LastName = "Gian Thiệu", CardIdentity = "123456783", Phone = "0328807771" },
                new Staff() { IdAccount = 11, FirstName = "Thư", LastName = "Nguyễn Thị Minh", CardIdentity = "123456782", Phone = "0328807770" });

            modelBuilder.Entity<TypeCustomer>().HasData(
                new TypeCustomer() { Id = 1, Name = "Gold", State = 1 },
                new TypeCustomer() { Id = 2, Name = "Silver ", State = 1 },
                new TypeCustomer() { Id = 3, Name = "Bronze", State = 1 });

            modelBuilder.Entity<Customer>().HasData(
               new Customer() { IdAccount = 7, FirstName = "Tuấn", LastName = "Võ Anh", IdTypeCustomer = 3, Point = 100 },
               new Customer() { IdAccount = 8, FirstName = "Như", LastName = "Huỳnh", IdTypeCustomer = 2, Point = 200 },
               new Customer() { IdAccount = 9, FirstName = "Ân", LastName = "Trần Văn", IdTypeCustomer = 1, Point = 300 },
               new Customer() { IdAccount = 12, FirstName = "Hiệp", LastName = "Nguyễn Đức", IdTypeCustomer = 1, Point = 300 });

            modelBuilder.Entity<DeliveryAddress>().HasData(
              new DeliveryAddress() { Id = 1, FirstName = "Tuấn", LastName = "Võ Anh", Phone = "0324407774", Address = "50/1 Đặng Văn Bi", Wards = "Trường Thọ", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 7, State = 1 },
              new DeliveryAddress() { Id = 2, FirstName = "Tú", LastName = "Võ Anh", Phone = "0324407773", Address = "KTX Khu B", Wards = "Linh Trung", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 7, State = 1 },
              new DeliveryAddress() { Id = 3, FirstName = "Như", LastName = "Huỳnh", Phone = "0324407772", Address = "KTX D2", Wards = "Tăng Nhơn Phú", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 8, State = 1 },
              new DeliveryAddress() { Id = 4, FirstName = "Bảo", LastName = "Lê Nguyễn Gia", Phone = "0324407771", Address = "46/64", Wards = "Phường 1", District = "Quận 1", Province = "Đồng Nai", IdCustomer = 8, State = 1 },
              new DeliveryAddress() { Id = 5, FirstName = "Ân", LastName = "Trần Văn", Phone = "0324407775", Address = "50/1 Đặng Văn Bi", Wards = "Trường Thọ", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 9, State = 1 },
              new DeliveryAddress() { Id = 6, FirstName = "Anh", LastName = "Trần Thi Mai", Phone = "0324407776", Address = "KTX Khu B", Wards = "Linh Trung", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 9, State = 1 },
              new DeliveryAddress() { Id = 7, FirstName = "Hiệp", LastName = "Nguyễn Đức", Phone = "0324407777", Address = "KTX D2", Wards = "Tăng Nhơn Phú", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 12, State = 1 },
              new DeliveryAddress() { Id = 8, FirstName = "Hiệp", LastName = "Nguyễn Đức", Phone = "0324407777", Address = "56/16", Wards = "Phước Hưng", District = "Long Điền", Province = "Bà Rịa-Vũng Tàu", IdCustomer = 12, State = 1 });

            modelBuilder.Entity<Category>().HasData(
                new Category() { Id = 1, Name = "Dress", CreatedById = 1, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 2, Name = "Denim", CreatedById = 1, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 3, Name = "Shirt", CreatedById = 1, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 4, Name = "Sweater", CreatedById = 2, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 5, Name = "Trousers", CreatedById = 2, CreatedDate = createdDate, State = 0 });

            modelBuilder.Entity<Color>().HasData(
               new Color() { Id = 1, Name = "White", ColorCode = "#FFFFFF", State = 1 },
               new Color() { Id = 2, Name = "Black", ColorCode = "#000000", State = 1 },
               new Color() { Id = 3, Name = "Blue", ColorCode = "#0000FF", State = 1 },
               new Color() { Id = 4, Name = "Red", ColorCode = "#FF0000", State = 1 },
               new Color() { Id = 5, Name = "Gray", ColorCode = "#808080", State = 0 });

            modelBuilder.Entity<Size>().HasData(
               new Size() { Id = 1, Name = "S", State = 1 },
               new Size() { Id = 2, Name = "M", State = 1 },
               new Size() { Id = 3, Name = "L", State = 1 },
               new Size() { Id = 4, Name = "XL", State = 1 },
               new Size() { Id = 5, Name = "XXL", State = 1 });

            modelBuilder.Entity<Product>().HasData(
              new Product() { Id = 1, Sku = "123456789", Name = "Avocado Dress Set", Description = "Avocado Dress Set is so pretty", TotalBuy = 100, State = 1, CreatedDate = createdDate, CreatedById = 3, IdCategory = 1, UnitPrice = 100000 },
              new Product() { Id = 2, Sku = "123456788", Name = "Ally Babydoll Dress", Description = "Ally Babydoll Dress is so pretty", TotalBuy = 10, State = 1, CreatedDate = createdDate, CreatedById = 3, IdCategory = 1, UnitPrice = 200000 },
              new Product() { Id = 3, Sku = "123456787", Name = "Baggy Jean", Description = "Baggy Jean is so pretty", TotalBuy = 200, State = 1, CreatedDate = createdDate, CreatedById = 4, IdCategory = 2, UnitPrice = 300000 },
              new Product() { Id = 4, Sku = "123456786", Name = "Short Jean", Description = "Short Jean is so pretty", TotalBuy = 300, State = 1, CreatedDate = createdDate, CreatedById = 4, IdCategory = 2, UnitPrice = 400000 },
              new Product() { Id = 5, Sku = "123456785", Name = "Mori Shirt", Description = "Mori Shirt is so pretty", TotalBuy = 400, State = 1, CreatedDate = createdDate, CreatedById = 3, IdCategory = 3, UnitPrice = 500000 },
              new Product() { Id = 6, Sku = "123456784", Name = "Yasmin Shirt", Description = "Yasmin Shirt is so pretty", TotalBuy = 500, State = 1, CreatedDate = createdDate, CreatedById = 3, IdCategory = 3, UnitPrice = 600000 },
              new Product() { Id = 7, Sku = "123456783", Name = "Aokosor Sweaters", Description = "Aokosor Sweaters is so pretty", TotalBuy = 10, State = 1, CreatedDate = createdDate, CreatedById = 3, IdCategory = 4, UnitPrice = 700000 },
              new Product() { Id = 8, Sku = "123456782", Name = "Hoodie", Description = "Hoodie is so pretty", TotalBuy = 10, State = 1, CreatedDate = createdDateNew, CreatedById = 3, IdCategory = 4, UnitPrice = 100000 },
              new Product() { Id = 9, Sku = "123456781", Name = "Mella Khaki Pant", Description = "Mella Khaki Pant is so pretty", TotalBuy = 10, State = 1, CreatedDate = createdDateNew, CreatedById = 3, IdCategory = 5, UnitPrice = 800000 },
              new Product() { Id = 10, Sku = "123456780", Name = "Mochi Pants", Description = "Mochi Pants is so pretty", TotalBuy = 10, State = 1, CreatedDate = createdDateNew, CreatedById = 3, IdCategory = 5, UnitPrice = 900000 },
              new Product() { Id = 11, Sku = "123456779", Name = "T-Shirts", Description = "T-Shirt is so pretty", TotalBuy = 10, State = 0, CreatedDate = createdDate, CreatedById = 3, IdCategory = 3, UnitPrice = 100000 });


            modelBuilder.Entity<Product_Size_Color>().HasData(
               new Product_Size_Color() { IdProduct = 1, IdSize = 1 ,IdColor = 1,  Stock = 100,State = 1 },
               new Product_Size_Color() { IdProduct = 1, IdSize = 2, IdColor = 1,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 1, IdSize = 3, IdColor = 1,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 2, IdSize = 2, IdColor = 2,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 2, IdSize = 2, IdColor = 3,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 3, IdSize = 1, IdColor = 4,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 4, IdSize = 1, IdColor = 2,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 4, IdSize = 1, IdColor = 3,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 5, IdSize = 2, IdColor = 3,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 5, IdSize = 2, IdColor = 4,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 6, IdSize = 1, IdColor = 1,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 7, IdSize = 1, IdColor = 1,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 8, IdSize = 1, IdColor = 1,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 9, IdSize = 1, IdColor = 1,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 10, IdSize = 1, IdColor = 1,  Stock = 100, State = 1 },
               new Product_Size_Color() { IdProduct = 11, IdSize = 1, IdColor = 1,  Stock = 100, State = 1 });

            modelBuilder.Entity<Log_Product>().HasData(
              new Log_Product() { Id = 1, IdProduct = 1, IdSize = 1, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 2, IdProduct = 1, IdSize = 2, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 3, IdProduct = 1, IdSize = 3, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 4, IdProduct = 2, IdSize = 2, IdColor = 2, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 5, IdProduct = 2, IdSize = 2, IdColor = 3, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 6, IdProduct = 3, IdSize = 1, IdColor = 4, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 7, IdProduct = 4, IdSize = 1, IdColor = 2, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 8, IdProduct = 5, IdSize = 2, IdColor = 3, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 9, IdProduct = 5, IdSize = 2, IdColor = 4, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 10, IdProduct = 6, IdSize = 1, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 11, IdProduct = 7, IdSize = 1, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 12, IdProduct = 8, IdSize = 1, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 13, IdProduct = 9, IdSize = 1, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 14, IdProduct = 10, IdSize = 1, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { Id = 15, IdProduct = 11, IdSize = 1, IdColor = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 120 });


            modelBuilder.Entity<Promotion>().HasData(
               new Promotion() { Id = 1, Name = "Tết Dương Lịch", Description = "Tết Dương Lịch", Value = 0.1, StartDate = createdDate, EndDate = endDate, State = 1, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 2, Name = "Sinh nhật khách hàng", Description = "Sinh nhật khách hàng", Value = 0.15, StartDate = createdDate, EndDate = endDate, State = 1, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 3, Name = "Quốc tế phụ nữ 08-03", Description = "Quốc tế phụ nữ 08-03", Value = 0.15, StartDate = createdDate, EndDate = endDate, State = 2, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 4, Name = "Tết Âm Lịch", Description = "Tết Âm Lịch", Value = 0.2, StartDate = createdDate, EndDate = endDate, State = 2, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 5, Name = "Phụ Nữ Việt Nam 20-10", Description = "Phụ Nữ Việt Nam 20-10", Value = 0.1, StartDate = createdDate, EndDate = endDate, State = 3, CreatedDate = createdDate, CreatedById = 3 });

            modelBuilder.Entity<Cart>().HasData(
               new Cart() { IdCustomer = 7, IdProduct = 1, IdSize = 1, IdColor = 1, Quantity = 20 },
               new Cart() { IdCustomer = 7, IdProduct = 2, IdSize = 2, IdColor = 2, Quantity = 20 },
               new Cart() { IdCustomer = 7, IdProduct = 3, IdSize = 1, IdColor = 4, Quantity = 20 },
               new Cart() { IdCustomer = 8, IdProduct = 4, IdSize = 1, IdColor = 2, Quantity = 20 },
               new Cart() { IdCustomer = 8, IdProduct = 5, IdSize = 2, IdColor = 3, Quantity = 20 },
               new Cart() { IdCustomer = 8, IdProduct = 6, IdSize = 1, IdColor = 1, Quantity = 20 },
               new Cart() { IdCustomer = 9, IdProduct = 7, IdSize = 1, IdColor = 1, Quantity = 20 },
               new Cart() { IdCustomer = 9, IdProduct = 8, IdSize = 1, IdColor = 1, Quantity = 20 },
               new Cart() { IdCustomer = 9, IdProduct = 9, IdSize = 1, IdColor = 1, Quantity = 20 });

            modelBuilder.Entity<Order>().HasData(
               new Order() { Id = 1, DateOrder = createdDate, TotalQuantity = 20, TotalProductPrice = 12000000, TotalAmount = 10830000, State = 1, FeeDelivery = 30000, IdAddress = 1, IdCustomer = 7, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 2, DateOrder = createdDate, TotalQuantity = 30, TotalProductPrice = 17100000, TotalAmount = 15420000, State = 2, FeeDelivery = 30000, IdAddress = 2, IdCustomer = 7, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 3, DateOrder = createdDate, TotalQuantity = 20, TotalProductPrice = 8100000, TotalAmount = 7320000, State = 3, FeeDelivery = 30000, IdAddress = 3, IdCustomer = 8, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 4, DateOrder = createdDate, TotalQuantity = 30, TotalProductPrice = 19200000, TotalAmount = 17310000, State = 4, FeeDelivery = 30000, IdAddress = 4, IdCustomer = 8, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 5, DateOrder = createdDate, TotalQuantity = 30, TotalProductPrice = 17100000, TotalAmount = 15420000, State = 3, FeeDelivery = 30000, IdAddress = 4, IdCustomer = 9, IdPromotion = 1, IdStaff = 3, IdShipper = 5 });

            modelBuilder.Entity<OrderDetail>().HasData(
               new OrderDetail() { IdOrder = 1, IdProduct = 1, IdSize = 1, IdColor = 1, Quantity = 10, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 1, IdProduct = 2, IdSize = 2, IdColor = 2, Quantity = 10, UnitPrice = 280000 },
               new OrderDetail() { IdOrder = 2, IdProduct = 3, IdSize = 1, IdColor = 4, Quantity = 15, UnitPrice = 250000 },
               new OrderDetail() { IdOrder = 2, IdProduct = 4, IdSize = 1, IdColor = 2, Quantity = 15, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 3, IdProduct = 5, IdSize = 2, IdColor = 3, Quantity = 10, UnitPrice = 220000 },
               new OrderDetail() { IdOrder = 3, IdProduct = 6, IdSize = 1, IdColor = 1, Quantity = 10, UnitPrice = 195000 },
               new OrderDetail() { IdOrder = 4, IdProduct = 7, IdSize = 1, IdColor = 1, Quantity = 15, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 4, IdProduct = 8, IdSize = 1, IdColor = 1, Quantity = 15, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 5, IdProduct = 3, IdSize = 1, IdColor = 1, Quantity = 15, UnitPrice = 250000 },
               new OrderDetail() { IdOrder = 5, IdProduct = 4, IdSize = 1, IdColor = 1, Quantity = 15, UnitPrice = 320000 });
        }


    }
}