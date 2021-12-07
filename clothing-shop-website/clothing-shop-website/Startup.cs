using clothing_shop_website.Helper;
using clothing_shop_website.Interface;
using clothing_shop_website.Services;
using Infrastructure.Persistent;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace clothing_shop_website
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<DataDbContext>(options => options.UseSqlServer(@"Data Source=HONGDUC109\TIENGIANG; Initial Catalog=clothingdb; User ID=sa; PWD=123456aA",
            b => b.MigrationsAssembly("clothing-shop-website")));

            //services.AddDbContext<DataDbContext>(options => options.UseSqlServer(@"Data Source=localhost; Initial Catalog=clothingdb; User ID=sa; PWD=kimdong",
            //b => b.MigrationsAssembly("clothing-shop-website")));

            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo {
                    Title = "Mango Clothes API",
                    Version = "v1",
                    Description = "Description for the API."
                });
            });

            services.AddSingleton(new ProductsService());
            services.AddSingleton(new AccountService());
            services.AddSingleton(new CustomersService());
            services.AddSingleton(new PromotionsService());
            services.AddSingleton(new OrdersService());
            services.AddSingleton(new CategoriesService());
            services.AddSingleton(new StaffService());

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
            {
                option.RequireHttpsMetadata = false;
                option.SaveToken = true; // save token in http context
                option.TokenValidationParameters = new TokenValidationParameters()
                {
                    // enable authentication Issuer & Audience
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["Jwt:Audience"],
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddScoped<IImageService, ImageService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(s => {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API");

                s.RoutePrefix = string.Empty;
            });

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication(); // middleware

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                //endpoints.MapControllers();

                endpoints.MapControllerRoute(
                name: "AdminArea",
                pattern: "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}");

                //endpoints.MapControllerRoute(
                //name: "ClientArea",
                //pattern: "{area:exists}/{controller}/{action}/{id?}");
            });
        }
    }
}