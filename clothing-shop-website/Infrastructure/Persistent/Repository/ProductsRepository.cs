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
            var lProduct = await _dbContext.Products.Where(p => p.State > 0).ToListAsync();

            return lProduct.AsQueryable();
        }

        public IQueryable<Product> GetAllProductsByIDCategory(int CategoryID)
        {
            var lProduct =  _dbContext.Products.Where(p => p.IdCategory == CategoryID && p.State > 0).ToList();

            return lProduct.AsQueryable();
        }

        public Product GetProductByID(int productID)
        {
            return _dbContext.Products.FirstOrDefault(p => p.Id == productID && p.State > 0);
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

        public async Task<IQueryable<Product_Size_Color>> GetListItemByIdProduct(int productID)
        {
            var lProductItems =  await _dbContext.Product_Size_Colors.Where(p => p.IdProduct == productID && p.State > 0).ToListAsync();

            return lProductItems.AsQueryable();
        }

        public bool CheckItemInList(Log_Product logproduct)
        {
            bool check = false;
            var count = _dbContext.Product_Size_Colors.Where(i => i.IdProduct == logproduct.IdProduct && i.IdSize == logproduct.IdSize && i.IdColor == logproduct.IdColor && i.State > 0).ToList().Count;
            if (count > 0)
                check = true;
            
            return check;
        }

        public Product_Size_Color GetItemByIdPSC(Log_Product logproduct)
        {
            return _dbContext.Product_Size_Colors.FirstOrDefault(i => i.IdProduct == logproduct.IdProduct && i.IdSize == logproduct.IdSize && i.IdColor == logproduct.IdColor && i.State > 0);
        }

    }
}
