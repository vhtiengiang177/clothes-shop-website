using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistent.Repository
{
    class ProductsRepository : IProductsRepository
    {
        private DataDbContext _dbContext;

        public ProductsRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public async Task<IQueryable<Product>> GetAllProducts()
        {
            var lProduct = await _dbContext.Products.ToListAsync();

            return lProduct.AsQueryable();
        }

        public IQueryable<Product> GetAllProductsByIDCategory(int CategoryID)
        {
            var lProduct =  _dbContext.Products.Where(p => p.IdCategory == CategoryID).ToList();

            return lProduct.AsQueryable();
        }

       

        public Product GetProductByID(int productID)
        {
            return _dbContext.Products.FirstOrDefault(p => p.Id == productID);
        }
        public Product CreateProduct(Product product)
        {
            var result = _dbContext.Products.Add(product);

            return result.Entity;
        }
        public void UpdateProduct(Product product)
        {
            _dbContext.Attach(product);
            _dbContext.Entry(product).State = EntityState.Modified;
        }
        public void DeleteProduct(Product product)
        {
            if (_dbContext.Entry(product).State == EntityState.Detached) {
                _dbContext.Attach(product);
            }
            _dbContext.Remove(product);
        }
        public IQueryable<Product> SortListProducts(string sort, IQueryable<Product> lProduct)
        {
            switch (sort) {
                case "sku:asc":
                    lProduct = lProduct.OrderBy(p => p.Sku).AsQueryable();
                    break;
                case "sku:desc":
                    lProduct = lProduct.OrderByDescending(p => p.Sku).AsQueryable();
                    break;
                //case "totalbuy:asc":
                //    lProduct = lProduct.OrderBy(p => p.TotalBuy).AsQueryable();
                //    break;
                //case "totalbuy:desc":
                //    lProduct = lProduct.OrderByDescending(p => p.TotalBuy).AsQueryable();
                //    break;
                //case "stock:asc":
                //    lProduct = lProduct.OrderBy(p => p.Stock).AsQueryable();
                //    break;
                //case "stock:desc":
                //    lProduct = lProduct.OrderByDescending(p => p.Stock).AsQueryable();
                //    break;
                //case "price:asc":
                //    lProduct = lProduct.OrderBy(p => p.Price).AsQueryable();
                //    break;
                //case "price:desc":
                //    lProduct = lProduct.OrderByDescending(p => p.Price).AsQueryable();
                //    break;
                case "name:desc":
                    lProduct = lProduct.OrderByDescending(p => p.Name).AsQueryable();
                    break;
                case "name:asc":
                    lProduct = lProduct.OrderBy(p => p.Name).AsQueryable();
                    break;
                case "id:asc":
                    lProduct = lProduct.OrderBy(p => p.Id).AsQueryable();
                    break;
                default:
                    lProduct = lProduct.OrderByDescending(p => p.Id).AsQueryable();
                    break;
            }

            return lProduct;
        }

        public IQueryable<Product_Color> GetProductColorByIdProduct(int productID)
        {
            var lProductColor = _dbContext.Product_Colors.Where(p => p.IdProduct == productID).ToList();

            return lProductColor.AsQueryable();
        }

        public IQueryable<Product_Size> GetProductSizeByIdProduct(int productID)
        {
            var lProductSize = _dbContext.Product_Sizes.Where(p => p.IdProduct == productID).ToList();

            return lProductSize.AsQueryable();
        }

        public IQueryable<Product_Material> GetProductMaterialByIdProduct(int productID)
        {
            var lProductMaterial = _dbContext.Product_Materials.Where(p => p.IdProduct == productID).ToList();

            return lProductMaterial.AsQueryable();
        }
    }
}
