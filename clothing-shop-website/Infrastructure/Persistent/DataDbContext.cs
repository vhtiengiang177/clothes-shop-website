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
        public DbSet<Material> Materials { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Product_Color> Product_Colors { get; set; }
        public DbSet<Product_Material> Product_Materials { get; set; }
        public DbSet<Product_Size> Product_Sizes { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<ShopInfo> ShopInfos { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Style> Styles { get; set; }
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
                entity.HasKey(e => new { e.IdCustomer, e.IdProduct });

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
                entity.HasKey(e => e.Id);
            });

            modelBuilder.Entity<Material>(entity => {
                entity.HasKey(e => e.Id);
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
                entity.HasKey(e => new { e.IdOrder, e.IdProduct });

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

                entity.HasOne<Style>(e => e.Style)
                        .WithMany(style => style.Products)
                        .HasForeignKey(e => e.IdStyle);

                entity.HasMany<Image>(e => e.Images)
                      .WithOne(image => image.Product);

                entity.HasOne<Log_Product>(e => e.Log_Product)
                      .WithOne(logproduct => logproduct.Product)
                      .HasForeignKey<Log_Product>(logproduct => logproduct.IdProduct);
            });

            modelBuilder.Entity<Product_Color>(entity => {
                entity.HasKey(e => new { e.IdProduct, e.IdColor });

                entity.HasOne<Product>(e => e.Product)
                        .WithMany(product => product.Product_Colors)
                        .HasForeignKey(e => e.IdProduct);

                entity.HasOne<Color>(e => e.Color)
                        .WithMany(color => color.Product_Colors)
                        .HasForeignKey(e => e.IdColor);
            });

            modelBuilder.Entity<Product_Material>(entity => {
                entity.HasKey(e => new { e.IdProduct, e.IdMaterial });

                entity.HasOne<Product>(e => e.Product)
                        .WithMany(product => product.Product_Materials)
                        .HasForeignKey(e => e.IdProduct);

                entity.HasOne<Material>(e => e.Material)
                        .WithMany(material => material.Product_Material)
                        .HasForeignKey(e => e.IdMaterial);
            });

            modelBuilder.Entity<Product_Size>(entity => {
                entity.HasKey(e => new { e.IdProduct, e.IdSize });

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

            modelBuilder.Entity<Style>(entity => {
                entity.HasKey(e => e.Id);

                entity.HasMany<Product>(e => e.Products)
                      .WithOne(product => product.Style);
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
            DateTime createdDate = new DateTime(2021,07,10);
            DateTime endDate = new DateTime(2022, 7, 15);

            modelBuilder.Entity<ShopInfo>().HasData(
                new ShopInfo() { Id = 1, Name = "Mango Clothes", Address = "Số 1 Võ văn Ngân", Wards = "Bình Thọ", District = "TP.Thủ Đức", Province = "TP.HCM" });

            modelBuilder.Entity<TypeAccount>().HasData(
                new TypeAccount() { Id = 1, Name = "Admin", State = 1 },
                new TypeAccount() { Id = 2, Name = "Staff", State = 1 },
                new TypeAccount() { Id = 3, Name = "Shipper", State = 1 },
                new TypeAccount() { Id = 4, Name = "Customer", State = 1 });

            modelBuilder.Entity<Account>().HasData(
                new Account() { Id = 1, Email = "Admin@gmail.com", Password = "123456789Abc", IdTypeAccount = 1, State = 1 },
                new Account() { Id = 2, Email = "Admin2@gmail.com", Password = "123456789Abc", IdTypeAccount = 1, State = 1 },
                new Account() { Id = 3, Email = "Staff@gmail.com", Password = "123456789Abc", IdTypeAccount = 2, State = 1 },
                new Account() { Id = 4, Email = "Staff2@gmail.com", Password = "123456789Abc", IdTypeAccount = 2, State = 1 },
                new Account() { Id = 5, Email = "Shipper@gmail.com", Password = "123456789Abc", IdTypeAccount = 3, State = 1 },
                new Account() { Id = 6, Email = "Shipper2@gmail.com", Password = "123456789Abc", IdTypeAccount = 3, State = 1 },
                new Account() { Id = 7, Email = "Customer@gmail.com", Password = "123456789Abc", IdTypeAccount = 4, State = 1 },
                new Account() { Id = 8, Email = "Custome2@gmail.com", Password = "123456789Abc", IdTypeAccount = 4, State = 1 },
                new Account() { Id = 9, Email = "Custome3@gmail.com", Password = "123456789Abc", IdTypeAccount = 4, State = 1 },
                new Account() { Id = 10, Email = "Staff3@gmail.com", Password = "123456789Abc", IdTypeAccount = 2, State = 0 },
                new Account() { Id = 11, Email = "Shipper3@gmail.com", Password = "123456789Abc", IdTypeAccount = 2, State = 0 },
                new Account() { Id = 12, Email = "Custome4@gmail.com", Password = "123456789Abc", IdTypeAccount = 4, State = 0 });

            modelBuilder.Entity<Staff>().HasData(
                new Staff() { IdAccount = 1, FirstName = "Võ Hồng Tiên", LastName = "Giang", CardIdentity = "123456786", Phone = "0328807778" },
                new Staff() { IdAccount = 2, FirstName = "Nguyễn Thị", LastName = "Thảo", CardIdentity = "123456787", Phone = "0328807776" },
                new Staff() { IdAccount = 3, FirstName = "Lê Nguyễn Gia", LastName = "Bảo", CardIdentity = "123456789", Phone = "0328807774" },
                new Staff() { IdAccount = 4, FirstName = "Lê Thị Ngọc", LastName = "Yến", CardIdentity = "123456788", Phone = "0328807775" },
                new Staff() { IdAccount = 5, FirstName = "Trần Thủy", LastName = "Tiên", CardIdentity = "123456785", Phone = "0328807773"},
                new Staff() { IdAccount = 6, FirstName = "Lê Thị Ngọc", LastName = "Yến", CardIdentity = "123456784", Phone = "0328807772"},
                new Staff() { IdAccount = 10, FirstName = "Gian Thiệu", LastName = "Quân", CardIdentity = "123456783", Phone = "0328807771"},
                new Staff() { IdAccount = 11, FirstName = "Nguyễn Thị Minh", LastName = "Thư", CardIdentity = "123456782", Phone = "0328807770" });

            modelBuilder.Entity<TypeCustomer>().HasData(
                new TypeCustomer() { Id = 1, Name = "Gold", State = 1 },
                new TypeCustomer() { Id = 2, Name = "Silver ", State = 1 },
                new TypeCustomer() { Id = 3, Name = "Bronze", State = 1 });

            modelBuilder.Entity<Customer>().HasData(
               new Customer() { IdAccount = 7, FirstName = "Võ Anh", LastName = "Tuấn", VerifyEmail = 1, IdTypeCustomer = 3, Point = 100 },
               new Customer() { IdAccount = 8, FirstName = "Huỳnh", LastName = "Như", VerifyEmail = 1, IdTypeCustomer = 2, Point = 200 },
               new Customer() { IdAccount = 9, FirstName = "Trần Văn", LastName = "Ân", VerifyEmail = 1, IdTypeCustomer = 1, Point = 300 },
               new Customer() { IdAccount = 12, FirstName = "Nguyễn Đức", LastName = "Hiệp", VerifyEmail = 1, IdTypeCustomer = 1, Point = 300 });

            modelBuilder.Entity<DeliveryAddress>().HasData(
              new DeliveryAddress() { Id = 1, FirstName = "Võ Anh", LastName = "Tuấn", Phone = "0324407774", Address = "50/1 Đặng Văn Bi", Wards = "Trường Thọ", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 7, State = 1 },
              new DeliveryAddress() { Id = 2, FirstName = "Võ Anh", LastName = "Tú", Phone = "0324407773", Address = "KTX Khu B", Wards = "Linh Trung", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 7, State = 1 },
              new DeliveryAddress() { Id = 3, FirstName = "Huỳnh", LastName = "Như", Phone = "0324407772", Address = "KTX D2", Wards = "Tăng Nhơn Phú", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 8, State = 1 },
              new DeliveryAddress() { Id = 4, FirstName = "Lê Nguyễn Gia", LastName = "Bảo", Phone = "0324407771", Address = "46/64", Wards = "Phường 1", District = "Quận 1", Province = "Đồng Nai", IdCustomer = 8, State = 1 },
              new DeliveryAddress() { Id = 5, FirstName = "Trần Văn", LastName = "Ân", Phone = "0324407775", Address = "50/1 Đặng Văn Bi", Wards = "Trường Thọ", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 9, State = 1 },
              new DeliveryAddress() { Id = 6, FirstName = "Trần Thi Mai", LastName = "Anh", Phone = "0324407776", Address = "KTX Khu B", Wards = "Linh Trung", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 9, State = 1 },
              new DeliveryAddress() { Id = 7, FirstName = "Nguyễn Đức", LastName = "Hiệp", Phone = "0324407777", Address = "KTX D2", Wards = "Tăng Nhơn Phú", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 12, State = 1 },
              new DeliveryAddress() { Id = 8, FirstName = "Nguyễn Đức", LastName = "Hiệp", Phone = "0324407777", Address = "56/16", Wards = "Phước Hưng", District = "Long Điền", Province = "Bà Rịa-Vũng Tàu", IdCustomer = 12, State = 1 });

            modelBuilder.Entity<Category>().HasData(
                new Category() { Id = 1, Name = "Dress", CreatedById = 1, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 2, Name = "Denim", CreatedById = 1, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 3, Name = "Shirt", CreatedById = 1, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 4, Name = "Sweater", CreatedById = 2, CreatedDate = createdDate, State = 1 },
                new Category() { Id = 5, Name = "Trousers", CreatedById = 2, CreatedDate = createdDate, State = 0 });

            modelBuilder.Entity<Color>().HasData(
               new Color() { Id = 1, Name = "White", State = 1 },
               new Color() { Id = 2, Name = "Black", State = 1 },
               new Color() { Id = 3, Name = "Blue", State = 1 },
               new Color() { Id = 4, Name = "Red", State = 1 },
               new Color() { Id = 5, Name = "Gray", State = 0 });

            modelBuilder.Entity<Size>().HasData(
               new Size() { Id = 1, Name = "S", State = 1 },
               new Size() { Id = 2, Name = "M", State = 1 },
               new Size() { Id = 3, Name = "L", State = 1 },
               new Size() { Id = 4, Name = "XL", State = 1 },
               new Size() { Id = 5, Name = "XXL", State = 1 });

            modelBuilder.Entity<Material>().HasData(
               new Material() { Id = 1, Name = "Cotton", State = 1 },
               new Material() { Id = 2, Name = "Wool", State = 1 },
               new Material() { Id = 3, Name = "Silk", State = 1 },
               new Material() { Id = 4, Name = "Leather", State = 1 },
               new Material() { Id = 5, Name = "Cellulosic fibres", State = 1 });

            modelBuilder.Entity<Style>().HasData(
               new Style() { Id = 1, Name = "Shift Dress", State = 1 },
               new Style() { Id = 2, Name = "Midi Dress", State = 1 },
               new Style() { Id = 3, Name = "Long Jeans", State = 1 },
               new Style() { Id = 4, Name = "Short Jeans", State = 1 },
               new Style() { Id = 5, Name = "Basic Shirt", State = 1 },
               new Style() { Id = 6, Name = "Fussily Shirt", State = 1 },
               new Style() { Id = 7, Name = "Basic Sweater", State = 1 },
               new Style() { Id = 8, Name = "Fussily Sweater", State = 1 },
               new Style() { Id = 9, Name = "Basic Trousers", State = 1 },
               new Style() { Id = 10, Name = "Fussily Trousers", State = 1 },
               new Style() { Id = 11, Name = "T-Shirt", State = 1 });

            modelBuilder.Entity<Product>().HasData(
              new Product() { Id = 1, Sku = "123456789", Name = "Avocado Dress Set", Description = "Avocado Dress Set is so pretty", State = 1, Price = 320000, TotalBuy = 100, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 1, IdCategory = 1 },
              new Product() { Id = 2, Sku = "123456788", Name = "Ally Babydoll Dress", Description = "Ally Babydoll Dress is so pretty", State = 1, Price = 280000, TotalBuy = 900, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 2, IdCategory = 1 },
              new Product() { Id = 3, Sku = "123456787", Name = "Baggy Jean", Description = "Baggy Jean is so pretty", State = 1, Price = 250000, TotalBuy = 80, Stock = 200, CreatedDate = createdDate, CreatedById = 4, IdStyle = 3, IdCategory = 2 },
              new Product() { Id = 4, Sku = "123456786", Name = "Short Jean", Description = "Short Jean is so pretty", State = 1, Price = 320000, TotalBuy = 70, Stock = 200, CreatedDate = createdDate, CreatedById = 4, IdStyle = 4, IdCategory = 2 },
              new Product() { Id = 5, Sku = "123456785", Name = "Mori Shirt", Description = "Mori Shirt is so pretty", State = 1, Price = 220000, TotalBuy = 100, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 5, IdCategory = 3 },
              new Product() { Id = 6, Sku = "123456784", Name = "Yasmin Shirt", Description = "Yasmin Shirt is so pretty", State = 1, Price = 195000, TotalBuy = 50, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 6, IdCategory = 3 },
              new Product() { Id = 7, Sku = "123456783", Name = "Aokosor Sweaters", Description = "Aokosor Sweaters is so pretty", State = 1, Price = 320000, TotalBuy = 100, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 7, IdCategory = 4 },
              new Product() { Id = 8, Sku = "123456782", Name = "Hoodie", Description = "Hoodie is so pretty", State = 1, Price = 320000, TotalBuy = 100, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 8, IdCategory = 4 },
              new Product() { Id = 9, Sku = "123456781", Name = "Mella Khaki Pant", Description = "Mella Khaki Pant is so pretty", State = 1, Price = 225000, TotalBuy = 100, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 9, IdCategory = 5 },
              new Product() { Id = 10, Sku = "123456780", Name = "Mochi Pants", Description = "Mochi Pants is so pretty", State = 1, Price = 220000, TotalBuy = 100, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 10, IdCategory = 5 },
              new Product() { Id = 11, Sku = "123456779", Name = "T-Shirts", Description = "T-Shirt is so pretty", State = 0, Price = 220000, TotalBuy = 100, Stock = 200, CreatedDate = createdDate, CreatedById = 3, IdStyle = 11, IdCategory = 3 });

            modelBuilder.Entity<Product_Color>().HasData(
               new Product_Color() { IdProduct = 1, IdColor = 1 },
               new Product_Color() { IdProduct = 2, IdColor = 2 },
               new Product_Color() { IdProduct = 3, IdColor = 3 },
               new Product_Color() { IdProduct = 4, IdColor = 4 },
               new Product_Color() { IdProduct = 5, IdColor = 5 },
               new Product_Color() { IdProduct = 6, IdColor = 1 },
               new Product_Color() { IdProduct = 7, IdColor = 2 },
               new Product_Color() { IdProduct = 8, IdColor = 3 },
               new Product_Color() { IdProduct = 9, IdColor = 4 },
               new Product_Color() { IdProduct = 10, IdColor = 5 },
               new Product_Color() { IdProduct = 11, IdColor = 1 });

            modelBuilder.Entity<Product_Size>().HasData(
               new Product_Size() { IdProduct = 1, IdSize = 1 },
               new Product_Size() { IdProduct = 2, IdSize = 2 },
               new Product_Size() { IdProduct = 3, IdSize = 3 },
               new Product_Size() { IdProduct = 4, IdSize = 4 },
               new Product_Size() { IdProduct = 5, IdSize = 5 },
               new Product_Size() { IdProduct = 6, IdSize = 1 },
               new Product_Size() { IdProduct = 7, IdSize = 2 },
               new Product_Size() { IdProduct = 8, IdSize = 3 },
               new Product_Size() { IdProduct = 9, IdSize = 4 },
               new Product_Size() { IdProduct = 10, IdSize = 5 },
               new Product_Size() { IdProduct = 11, IdSize = 1 });

            modelBuilder.Entity<Product_Material>().HasData(
               new Product_Material() { IdProduct = 1, IdMaterial = 1 },
               new Product_Material() { IdProduct = 2, IdMaterial = 2 },
               new Product_Material() { IdProduct = 3, IdMaterial = 3 },
               new Product_Material() { IdProduct = 4, IdMaterial = 4 },
               new Product_Material() { IdProduct = 5, IdMaterial = 5 },
               new Product_Material() { IdProduct = 6, IdMaterial = 1 },
               new Product_Material() { IdProduct = 7, IdMaterial = 2 },
               new Product_Material() { IdProduct = 8, IdMaterial = 3 },
               new Product_Material() { IdProduct = 9, IdMaterial = 4 },
               new Product_Material() { IdProduct = 10, IdMaterial = 5 },
               new Product_Material() { IdProduct = 11, IdMaterial = 1 });

            modelBuilder.Entity<Log_Product>().HasData(
               new Log_Product() { Id = 1, IdProduct = 1, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 2, IdProduct = 2, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 3, IdProduct = 3, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 4, IdProduct = 4, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 5, IdProduct = 5, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 6, IdProduct = 6, CreatedDate = createdDate, CreatedById = 1, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 7, IdProduct = 7, CreatedDate = createdDate, CreatedById = 2, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 8, IdProduct = 8, CreatedDate = createdDate, CreatedById = 2, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 9, IdProduct = 9, CreatedDate = createdDate, CreatedById = 2, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 10, IdProduct = 10, CreatedDate = createdDate, CreatedById = 2, ImportPrice = 150000, Quantity = 300 },
               new Log_Product() { Id = 11, IdProduct = 11, CreatedDate = createdDate, CreatedById = 2, ImportPrice = 150000, Quantity = 300 });

            modelBuilder.Entity<Promotion>().HasData(
               new Promotion() { Id = 1, Name = "Tết Dương Lịch", Description = "Tết Dương Lịch", Value = 0.1, StartDate = createdDate, EndDate = endDate, State = 1, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 2, Name = "Sinh nhật khách hàng", Description = "Sinh nhật khách hàng", Value = 0.15, StartDate = createdDate, EndDate = endDate, State = 1, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 3, Name = "Quốc tế phụ nữ 08-03", Description = "Quốc tế phụ nữ 08-03", Value = 0.15, StartDate = createdDate, EndDate = endDate, State = 2, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 4, Name = "Tết Âm Lịch", Description = "Tết Âm Lịch", Value = 0.2, StartDate = createdDate, EndDate = endDate, State = 2, CreatedDate = createdDate, CreatedById = 3 },
               new Promotion() { Id = 5, Name = "Phụ Nữ Việt Nam 20-10", Description = "Phụ Nữ Việt Nam 20-10", Value = 0.1, StartDate = createdDate, EndDate = endDate, State = 3, CreatedDate = createdDate, CreatedById = 3 });

            modelBuilder.Entity<Cart>().HasData(
               new Cart() { IdCustomer = 7, IdProduct = 1, Quantity = 20 },
               new Cart() { IdCustomer = 7, IdProduct = 2, Quantity = 20 },
               new Cart() { IdCustomer = 7, IdProduct = 3, Quantity = 20 },
               new Cart() { IdCustomer = 8, IdProduct = 4, Quantity = 20 },
               new Cart() { IdCustomer = 8, IdProduct = 5, Quantity = 20 },
               new Cart() { IdCustomer = 8, IdProduct = 6, Quantity = 20 },
               new Cart() { IdCustomer = 9, IdProduct = 7, Quantity = 20 },
               new Cart() { IdCustomer = 9, IdProduct = 8, Quantity = 20 },
               new Cart() { IdCustomer = 9, IdProduct = 9, Quantity = 20 });

            modelBuilder.Entity<Order>().HasData(
               new Order() { Id = 1, DateOrder = createdDate, TotalQuantity = 20, TotalProductPrice = 12000000, TotalAmount = 10830000, State = 1, FeeDelivery = 30000, IdAddress = 1, IdCustomer = 7, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 2, DateOrder = createdDate, TotalQuantity = 30, TotalProductPrice = 17100000, TotalAmount = 15420000, State = 2, FeeDelivery = 30000, IdAddress = 2, IdCustomer = 7, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 3, DateOrder = createdDate, TotalQuantity = 20, TotalProductPrice = 8100000, TotalAmount = 7320000, State = 3, FeeDelivery = 30000, IdAddress = 3, IdCustomer = 8, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 4, DateOrder = createdDate, TotalQuantity = 30, TotalProductPrice = 19200000, TotalAmount = 17310000, State = 4, FeeDelivery = 30000, IdAddress = 4, IdCustomer = 8, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 5, DateOrder = createdDate, TotalQuantity = 30, TotalProductPrice = 17100000, TotalAmount = 15420000, State = 3, FeeDelivery = 30000, IdAddress = 4, IdCustomer = 9, IdPromotion = 1, IdStaff = 3, IdShipper = 5 });

            modelBuilder.Entity<OrderDetail>().HasData(
               new OrderDetail() { IdOrder = 1, IdProduct = 1, Quantity = 10, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 1, IdProduct = 2, Quantity = 10, UnitPrice = 280000 },
               new OrderDetail() { IdOrder = 2, IdProduct = 3, Quantity = 15, UnitPrice = 250000 },
               new OrderDetail() { IdOrder = 2, IdProduct = 4, Quantity = 15, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 3, IdProduct = 5, Quantity = 10, UnitPrice = 220000 },
               new OrderDetail() { IdOrder = 3, IdProduct = 6, Quantity = 10, UnitPrice = 195000 },
               new OrderDetail() { IdOrder = 4, IdProduct = 7, Quantity = 15, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 4, IdProduct = 8, Quantity = 15, UnitPrice = 320000 },
               new OrderDetail() { IdOrder = 5, IdProduct = 3, Quantity = 15, UnitPrice = 250000 },
               new OrderDetail() { IdOrder = 5, IdProduct = 4, Quantity = 15, UnitPrice = 320000 });

        }


    }
}