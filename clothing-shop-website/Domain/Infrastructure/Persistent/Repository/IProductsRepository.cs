using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IProductsRepository
    {
        Task<IQueryable<Product>> GetAllProducts();
        Product GetProductByID(int productID);
        Product GetProductInactiveBySKU(string SKU);
        Task<IQueryable<Product_Size_Color>> GetListItemByIdProduct(int productID);
        Product CreateProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(Product product);
        IQueryable<Product> GetProductsByCategoriesID(int[] idCategories);
        Product_Size_Color GetItemActiveByIdPSC(int idProduct, int idSize, int idColor);
        IQueryable<Product> GetTopProductBestSellers();
        IQueryable<Product> GetTopNewProducts();
        IQueryable<Image> GetImagesByIdProduct(int productID);
        public Product_Size_Color GetItemByIdPSC(Log_Product logproduct);
        int CheckCountItemOfProduct(int productID);
    }
}
