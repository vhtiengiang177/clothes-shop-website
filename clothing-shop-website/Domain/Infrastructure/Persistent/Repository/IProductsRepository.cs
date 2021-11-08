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
        IQueryable<Product> GetAllProductsByIDCategory(int categoryID);
        Product CreateProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(Product product);
        IQueryable<Product> SortListProducts(string sort, IQueryable<Product> lProduct);
    }
}
