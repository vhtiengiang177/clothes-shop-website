using Domain.Entity;
using Microsoft.EntityFrameworkCore;

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
        }
    }
}