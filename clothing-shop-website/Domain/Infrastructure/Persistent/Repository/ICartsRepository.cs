using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface ICartsRepository
    {
        Task<IQueryable<Cart>> GetAllItemsInCart(int customerID);
        Cart GetItemInCart(int customerID, int productID, int sizeID, int colorID);
        Cart AddItemToCart(Cart cart);
        public void UpdateCart(Cart cart);
        public void DeleteItemInCart(Cart cart);
    }
}
