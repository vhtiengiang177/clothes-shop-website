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

        public Product GetProductByID(int productID)
        {
            return _dbContext.Products.FirstOrDefault(p => p.Id == productID && p.State > 0);
        }
        public Product CreateProduct(Product product)
        {
            product.CreatedDate = System.DateTime.Now;
            var result = _dbContext.Products.Add(product);

            return result.Entity;
        }

        public void UpdateProduct(Product product)
        {
            product.LastModified = System.DateTime.Now;
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

        public IQueryable<Product> GetProductsByCategoriesID(int[] idCategories)
        {
            int[] distinctIdCategories = idCategories.Distinct().ToArray();

            var lProductItem = _dbContext.Products
                                    .Where(p => distinctIdCategories.Contains((int)p.IdCategory) && p.State > 0).ToList();

            return lProductItem.AsQueryable();
        }

        public IQueryable<Product> GetTopProductBestSellers()
        {
            var lProduct =  _dbContext.Products.Where(p => p.State > 0).OrderByDescending(i => i.TotalBuy).Take(3).ToList();

            return lProduct.AsQueryable();
        }

        public IQueryable<Product> GetTopNewProducts()
        {
            var lProduct = _dbContext.Products.Where(p => p.State > 0).OrderByDescending(i => i.CreatedDate).Take(3).ToList();

            return lProduct.AsQueryable();
        }

        public IQueryable<Image> GetImagesByIdProduct(int productID)
        {
            var lImages = _dbContext.Images.Where(i => i.IdProduct == productID && i.State > 0).ToList();

            return lImages.AsQueryable();
        }
    }
}
