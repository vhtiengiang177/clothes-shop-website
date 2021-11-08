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
        Task<IQueryable<Product_Size_Color>> GetListItemByIdProduct(int productID);
        Product CreateProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(Product product);
        IQueryable<Product> SortListProducts(string sort, IQueryable<Product> lProduct);
        bool CheckItemInList(Log_Product logproduct);
        public Product_Size_Color GetItemByIdPSC(Log_Product logproduct);
    }
}
