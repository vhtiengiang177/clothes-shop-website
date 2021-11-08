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
                entity.HasKey(c => new { c.IdCustomer, c.IdProduct });

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

                entity.HasOne<Cart>(e => e.Cart)
                       .WithOne(cart => cart.Customer)
                       .HasForeignKey<Cart>(cart => cart.IdCustomer)
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
                entity.HasKey(e => new { e.IdProduct, e.IdSize, e.IdColor});
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
                        .WithOne(staff => staff.Order)
                        .HasForeignKey<Staff>(e => e.IdOrder)
                        .OnDelete(DeleteBehavior.Cascade);
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

                entity.HasOne<Order>(e => e.Order)
                       .WithOne(order => order.Staff)
                       .HasForeignKey<Order>(e => e.IdStaff);
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
            DateTime dt = DateTime.Today;
            DateTime _endDate = new DateTime(2022, 7, 15);

            modelBuilder.Entity<ShopInfo>().HasData(
                new ShopInfo() { Id = 1, Name = "Mango", Address = "Số 1 Võ văn Ngân", Wards = "Bình Thọ", District = "TP.Thủ Đức", Province = "TP.HCM" });

            modelBuilder.Entity<TypeAccount>().HasData(
                new TypeAccount() { Id = 1, Name = "Admin" },
                new TypeAccount() { Id = 2, Name = "Staff" },
                new TypeAccount() { Id = 3, Name = "Shipper" },
                new TypeAccount() { Id = 4, Name = "Customer" });

            modelBuilder.Entity<Account>().HasData(
                new Account() { Id = 1, Email = "Admin@gmail.com", Password = "123456789Abc", IdTypeAccount = 1 },
                new Account() { Id = 2, Email = "Admin2@gmail.com", Password = "123456789Abc", IdTypeAccount = 1 },
                new Account() { Id = 3, Email = "Staff@gmail.com", Password = "123456789Abc", IdTypeAccount = 2 },
                new Account() { Id = 4, Email = "Staff2@gmail.com", Password = "123456789Abc", IdTypeAccount = 2 },
                new Account() { Id = 5, Email = "Shipper@gmail.com", Password = "123456789Abc", IdTypeAccount = 3 },
                new Account() { Id = 6, Email = "Shipper2@gmail.com", Password = "123456789Abc", IdTypeAccount = 3 },
                new Account() { Id = 7, Email = "Customer@gmail.com", Password = "123456789Abc", IdTypeAccount = 4 },
                new Account() { Id = 8, Email = "Custome2@gmail.com", Password = "123456789Abc", IdTypeAccount = 4 },
                new Account() { Id = 9, Email = "Custome3@gmail.com", Password = "123456789Abc", IdTypeAccount = 4 },
                new Account() { Id = 10, Email = "Staff3@gmail.com", Password = "123456789Abc", IdTypeAccount = 2 },
                new Account() { Id = 11, Email = "Shipper3@gmail.com", Password = "123456789Abc", IdTypeAccount = 2 },
                new Account() { Id = 12, Email = "Custome4@gmail.com", Password = "123456789Abc", IdTypeAccount = 4 });

            modelBuilder.Entity<Staff>().HasData(
                new Staff() { IdAccount = 1, FirstName = "Võ Hồng Tiên", LastName = "Giang", CardIdentity = "123456786", Phone = "0328807778", State = 1 },
                new Staff() { IdAccount = 2, FirstName = "Nguyễn Thị", LastName = "Thảo", CardIdentity = "123456787", Phone = "0328807776", State = 1 },
                new Staff() { IdAccount = 3, FirstName = "Lê Nguyễn Gia", LastName = "Bảo", CardIdentity = "123456789", Phone = "0328807774", State = 1 },
                new Staff() { IdAccount = 4, FirstName = "Lê Thị Ngọc", LastName = "Yến", CardIdentity = "123456788", Phone = "0328807775", State = 1 },
                new Staff() { IdAccount = 5, FirstName = "Trần Thủy", LastName = "Tiên", CardIdentity = "123456785", Phone = "0328807773", State = 1 },
                new Staff() { IdAccount = 6, FirstName = "Lê Thị Ngọc", LastName = "Yến", CardIdentity = "123456784", Phone = "0328807772", State = 1 },
                new Staff() { IdAccount = 10, FirstName = "Gian Thiệu", LastName = "Quân", CardIdentity = "123456783", Phone = "0328807771", State = 0 },
                new Staff() { IdAccount = 11, FirstName = "Nguyễn Thị Minh", LastName = "Thư", CardIdentity = "123456782", Phone = "0328807770", State = 0 });

            modelBuilder.Entity<TypeCustomer>().HasData(
                new TypeCustomer() { Id = 1, Name = "Gold" },
                new TypeCustomer() { Id = 2, Name = "Silver " },
                new TypeCustomer() { Id = 3, Name = "Bronze" });

            modelBuilder.Entity<Customer>().HasData(
               new Customer() { IdAccount = 7, FirstName = "Võ Anh", LastName = "Tuấn", VerifyEmail = 1, IdTypeCustomer = 3, Point = 100, State = 1 },
               new Customer() { IdAccount = 8, FirstName = "Huỳnh", LastName = "Như", VerifyEmail = 1, IdTypeCustomer = 2, Point = 200, State = 1 },
               new Customer() { IdAccount = 9, FirstName = "Trần Văn", LastName = "Ân", VerifyEmail = 1, IdTypeCustomer = 1, Point = 300, State = 1 },
               new Customer() { IdAccount = 12, FirstName = "Nguyễn Đức", LastName = "Hiệp", VerifyEmail = 1, IdTypeCustomer = 1, Point = 300, State = 0 });

            modelBuilder.Entity<DeliveryAddress>().HasData(
              new DeliveryAddress() { Id = 1, FirstName = "Võ Anh", LastName = "Tuấn", Phone = "0324407774", Address = "50/1 Đặng Văn Bi", Wards = "Trường Thọ", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 7 },
              new DeliveryAddress() { Id = 2, FirstName = "Võ Anh", LastName = "Tú", Phone = "0324407773", Address = "KTX Khu B", Wards = "Linh Trung", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 7 },
              new DeliveryAddress() { Id = 3, FirstName = "Huỳnh", LastName = "Như", Phone = "0324407772", Address = "KTX D2", Wards = "Tăng Nhơn Phú", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 8 },
              new DeliveryAddress() { Id = 4, FirstName = "Lê Nguyễn Gia", LastName = "Bảo", Phone = "0324407771", Address = "46/64", Wards = "Phường 1", District = "Quận 1", Province = "Đồng Nai", IdCustomer = 8 },
              new DeliveryAddress() { Id = 5, FirstName = "Trần Văn", LastName = "Ân", Phone = "0324407775", Address = "50/1 Đặng Văn Bi", Wards = "Trường Thọ", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 9 },
              new DeliveryAddress() { Id = 6, FirstName = "Trần Thi Mai", LastName = "Anh", Phone = "0324407776", Address = "KTX Khu B", Wards = "Linh Trung", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 9 },
              new DeliveryAddress() { Id = 7, FirstName = "Nguyễn Đức", LastName = "Hiệp", Phone = "0324407777", Address = "KTX D2", Wards = "Tăng Nhơn Phú", District = "TP.Thủ Đức", Province = "TP.HCM", IdCustomer = 12 },
              new DeliveryAddress() { Id = 8, FirstName = "Nguyễn Đức", LastName = "Hiệp", Phone = "0324407777", Address = "56/16", Wards = "Phước Hưng", District = "Long Điền", Province = "Bà Rịa-Vũng Tàu", IdCustomer = 12 });

            modelBuilder.Entity<Category>().HasData(
                new Category() { Id = 1, Name = "Dress" },
                new Category() { Id = 2, Name = "Denim" },
                new Category() { Id = 3, Name = "Shirt" },
                new Category() { Id = 4, Name = "Sweater" },
                new Category() { Id = 5, Name = "Trousers" });

            modelBuilder.Entity<Color>().HasData(
               new Color() { Id = 1, Name = "White" },
               new Color() { Id = 2, Name = "Black" },
               new Color() { Id = 3, Name = "Blue" },
               new Color() { Id = 4, Name = "Red" },
               new Color() { Id = 5, Name = "Gray" });

            modelBuilder.Entity<Size>().HasData(
               new Size() { Id = 1, Name = "S" },
               new Size() { Id = 2, Name = "M" },
               new Size() { Id = 3, Name = "L" },
               new Size() { Id = 4, Name = "XL" },
               new Size() { Id = 5, Name = "XXL" });

            modelBuilder.Entity<Material>().HasData(
               new Material() { Id = 1, Name = "Cotton" },
               new Material() { Id = 2, Name = "Wool" },
               new Material() { Id = 3, Name = "Silk" },
               new Material() { Id = 4, Name = "Leather" },
               new Material() { Id = 5, Name = "Cellulosic fibres" });

            modelBuilder.Entity<Style>().HasData(
               new Style() { Id = 1, Name = "Shift Dress" },
               new Style() { Id = 2, Name = "Midi Dress" },
               new Style() { Id = 3, Name = "Long Jeans" },
               new Style() { Id = 4, Name = "Short Jeans" },
               new Style() { Id = 5, Name = "Basic Shirt" },
               new Style() { Id = 6, Name = "Fussily Shirt" },
               new Style() { Id = 7, Name = "Basic Sweater" },
               new Style() { Id = 8, Name = "Fussily Sweater" },
               new Style() { Id = 9, Name = "Basic Trousers" },
               new Style() { Id = 10, Name = "Fussily Trousers" },
               new Style() { Id = 11, Name = "T-Shirt" });

            modelBuilder.Entity<Product>().HasData(
              new Product() { Id = 1, Sku = "123456789", Name = "Avocado Dress Set", Description = "Avocado Dress Set is so pretty", State = true,  CreatedDate = dt, CreatedById = 3, IdStyle = 1, IdCategory = 1 },
              new Product() { Id = 2, Sku = "123456788", Name = "Ally Babydoll Dress", Description = "Ally Babydoll Dress is so pretty", State = true,  CreatedDate = dt, CreatedById = 3, IdStyle = 2, IdCategory = 1 },
              new Product() { Id = 3, Sku = "123456787", Name = "Baggy Jean", Description = "Baggy Jean is so pretty", State = true,  CreatedById = 4, IdStyle = 3, IdCategory = 2 },
              new Product() { Id = 4, Sku = "123456786", Name = "Short Jean", Description = "Short Jean is so pretty", State = true, CreatedDate = dt, CreatedById = 4, IdStyle = 4, IdCategory = 2 },
              new Product() { Id = 5, Sku = "123456785", Name = "Mori Shirt", Description = "Mori Shirt is so pretty", State = true, CreatedDate = dt, CreatedById = 3, IdStyle = 5, IdCategory = 3 },
              new Product() { Id = 6, Sku = "123456784", Name = "Yasmin Shirt", Description = "Yasmin Shirt is so pretty", State = true, CreatedDate = dt, CreatedById = 3, IdStyle = 6, IdCategory = 3 },
              new Product() { Id = 7, Sku = "123456783", Name = "Aokosor Sweaters", Description = "Aokosor Sweaters is so pretty", State = true, CreatedDate = dt, CreatedById = 3, IdStyle = 7, IdCategory = 4 },
              new Product() { Id = 8, Sku = "123456782", Name = "Hoodie", Description = "Hoodie is so pretty", State = true, CreatedDate = dt, CreatedById = 3, IdStyle = 8, IdCategory = 4 },
              new Product() { Id = 9, Sku = "123456781", Name = "Mella Khaki Pant", Description = "Mella Khaki Pant is so pretty", State = true, CreatedDate = dt, CreatedById = 3, IdStyle = 9, IdCategory = 5 },
              new Product() { Id = 10, Sku = "123456780", Name = "Mochi Pants", Description = "Mochi Pants is so pretty", State = true, CreatedDate = dt, CreatedById = 3, IdStyle = 10, IdCategory = 5 },
              new Product() { Id = 11, Sku = "123456779", Name = "T-Shirts", Description = "T-Shirt is so pretty", State = false, CreatedDate = dt, CreatedById = 3, IdStyle = 11, IdCategory = 3 });

            //modelBuilder.Entity<Product_Color>().HasData(
            //   new Product_Color() { IdProduct = 1, IdColor = 1 },
            //   new Product_Color() { IdProduct = 2, IdColor = 2 },
            //   new Product_Color() { IdProduct = 3, IdColor = 3 },
            //   new Product_Color() { IdProduct = 4, IdColor = 4 },
            //   new Product_Color() { IdProduct = 5, IdColor = 5 },
            //   new Product_Color() { IdProduct = 6, IdColor = 1 },
            //   new Product_Color() { IdProduct = 7, IdColor = 2 },
            //   new Product_Color() { IdProduct = 8, IdColor = 3 },
            //   new Product_Color() { IdProduct = 9, IdColor = 4 },
            //   new Product_Color() { IdProduct = 10, IdColor = 5 },
            //   new Product_Color() { IdProduct = 11, IdColor = 1 });

            modelBuilder.Entity<Product_Size>().HasData(
               new Product_Size() { IdProduct = 1, IdSize = 1 ,IdColor = 1, UnitPrice = 1000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 1, IdSize = 2, IdColor = 1, UnitPrice = 2000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 1, IdSize = 3, IdColor = 1, UnitPrice = 3000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 2, IdSize = 2, IdColor = 2, UnitPrice = 3000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 2, IdSize = 2, IdColor = 3, UnitPrice = 3000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 3, IdSize = 1, IdColor = 4, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 4, IdSize = 1, IdColor = 2, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 4, IdSize = 1, IdColor = 3, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 5, IdSize = 2, IdColor = 3, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 5, IdSize = 2, IdColor = 4, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 6, IdSize = 1, IdColor = 1, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 7, IdSize = 1, IdColor = 1, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 8, IdSize = 1, IdColor = 1, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 9, IdSize = 1, IdColor = 1, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 10, IdSize = 1, IdColor = 1, UnitPrice = 4000, TotalBuy = 20, Stock = 100 },
               new Product_Size() { IdProduct = 11, IdSize = 1, IdColor = 1, UnitPrice = 4000, TotalBuy = 20, Stock = 100 });

            modelBuilder.Entity<Log_Product>().HasData(
              new Log_Product() { IdProduct = 1, IdSize = 1, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 1, IdSize = 2, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 1, IdSize = 3, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 2, IdSize = 2, IdColor = 2, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 2, IdSize = 2, IdColor = 3, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 3, IdSize = 1, IdColor = 4, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 4, IdSize = 1, IdColor = 2, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 5, IdSize = 2, IdColor = 3, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 5, IdSize = 2, IdColor = 4, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 6, IdSize = 1, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 7, IdSize = 1, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 8, IdSize = 1, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 9, IdSize = 1, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 10, IdSize = 1, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 },
              new Log_Product() { IdProduct = 11, IdSize = 1, IdColor = 1, CreatedDate = dt, CreatedById = 1, ImportPrice = 150000, Quantity = 120 });


            //modelBuilder.Entity<Product_Material>().HasData(
            //   new Product_Material() { IdProduct = 1, IdMaterial = 1 },
            //   new Product_Material() { IdProduct = 2, IdMaterial = 2 },
            //   new Product_Material() { IdProduct = 3, IdMaterial = 3 },
            //   new Product_Material() { IdProduct = 4, IdMaterial = 4 },
            //   new Product_Material() { IdProduct = 5, IdMaterial = 5 },
            //   new Product_Material() { IdProduct = 6, IdMaterial = 1 },
            //   new Product_Material() { IdProduct = 7, IdMaterial = 2 },
            //   new Product_Material() { IdProduct = 8, IdMaterial = 3 },
            //   new Product_Material() { IdProduct = 9, IdMaterial = 4 },
            //   new Product_Material() { IdProduct = 10, IdMaterial = 5 },
            //   new Product_Material() { IdProduct = 11, IdMaterial = 1 });



            modelBuilder.Entity<Promotion>().HasData(
               new Promotion() { Id = 1, Name = "Tết Dương Lịch", Description = "Tết Dương Lịch", Value = 0.1, StartDate = dt, EndDate = _endDate, State = 1, CreatedDate = dt, CreatedById = 3 },
               new Promotion() { Id = 2, Name = "Sinh nhật khách hàng", Description = "Sinh nhật khách hàng", Value = 0.15, StartDate = dt, EndDate = _endDate, State = 1, CreatedDate = dt, CreatedById = 3 },
               new Promotion() { Id = 3, Name = "Quốc tế phụ nữ 08-03", Description = "Quốc tế phụ nữ 08-03", Value = 0.15, StartDate = dt, EndDate = _endDate, State = 2, CreatedDate = dt, CreatedById = 3 },
               new Promotion() { Id = 4, Name = "Tết Âm Lịch", Description = "Tết Âm Lịch", Value = 0.2, StartDate = dt, EndDate = _endDate, State = 2, CreatedDate = dt, CreatedById = 3 },
               new Promotion() { Id = 5, Name = "Phụ Nữ Việt Nam 20-10", Description = "Phụ Nữ Việt Nam 20-10", Value = 0.1, StartDate = dt, EndDate = _endDate, State = 3, CreatedDate = dt, CreatedById = 3 });

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
               new Order() { Id = 1, DateOrder = dt, TotalQuantity = 20, TotalProductPrice = 12000000, TotalAmount = 10830000, State = 1, FeeDelivery = 30000, IdAddress = 1, IdCustomer = 7, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 2, DateOrder = dt, TotalQuantity = 30, TotalProductPrice = 17100000, TotalAmount = 15420000, State = 2, FeeDelivery = 30000, IdAddress = 2, IdCustomer = 7, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 3, DateOrder = dt, TotalQuantity = 20, TotalProductPrice = 8100000, TotalAmount = 7320000, State = 3, FeeDelivery = 30000, IdAddress = 3, IdCustomer = 8, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 4, DateOrder = dt, TotalQuantity = 30, TotalProductPrice = 19200000, TotalAmount = 17310000, State = 4, FeeDelivery = 30000, IdAddress = 4, IdCustomer = 8, IdPromotion = 1, IdStaff = 3, IdShipper = 5 },
               new Order() { Id = 5, DateOrder = dt, TotalQuantity = 30, TotalProductPrice = 17100000, TotalAmount = 15420000, State = 3, FeeDelivery = 30000, IdAddress = 4, IdCustomer = 9, IdPromotion = 1, IdStaff = 3, IdShipper = 5 });

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