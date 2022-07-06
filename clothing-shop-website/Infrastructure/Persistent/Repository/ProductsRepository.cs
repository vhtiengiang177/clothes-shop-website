using Domain.Entity;
using Domain.Infrastructure.Persistent.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<IQueryable<Product_Size_Color>> GetListItemByIdProduct(int productID)
        {
            var lProductItems =  await _dbContext.Product_Size_Colors.Where(p => p.IdProduct == productID && p.State > 0).ToListAsync();

            return lProductItems.AsQueryable();
        }

        public Product_Size_Color GetItemActiveByIdPSC(int idProduct, int idSize, int idColor)
        {
            return _dbContext.Product_Size_Colors.FirstOrDefault(i => i.IdProduct == idProduct && i.IdSize == idSize && i.IdColor == idColor && i.State > 0);
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
            var lProduct =  _dbContext.Products.Where(p => p.State > 0).OrderByDescending(i => i.TotalBuy).ToList();

            return lProduct.AsQueryable();
        }

        public IQueryable<Product> GetTopNewProducts()
        {
            var lProduct = _dbContext.Products.Where(p => p.State > 0).OrderByDescending(i => i.CreatedDate).ToList();

            return lProduct.AsQueryable();
        }

        public IQueryable<Image> GetImagesByIdProduct(int productID)
        {
            var lImages = _dbContext.Images.Where(i => i.IdProduct == productID && i.State > 0).ToList();

            return lImages.AsQueryable();
        }

        public Product_Size_Color GetItemByIdPSC(int idProduct, int idSize, int idColor)
        {
            return _dbContext.Product_Size_Colors.FirstOrDefault(i => i.IdProduct == idProduct && i.IdSize == idSize && i.IdColor == idColor);
        }

        public Product GetProductInactiveBySKU(string SKU)
        {
            return _dbContext.Products.FirstOrDefault(p => p.Sku == SKU && p.State == 0);
        }

        public int CheckCountItemOfProduct(int productID)
        {
            var countItems = _dbContext.Product_Size_Colors.Where(p => p.IdProduct == productID && p.State > 0).Count();

            return countItems;
        }

        public async Task<IQueryable<Product>> GetProductsByIdPromotion(int idPromotion)
        {
            var lProduct = await _dbContext.Products.Where(p => p.idPromotion == idPromotion).ToListAsync();

            return lProduct.AsQueryable();
        }


    }
}
