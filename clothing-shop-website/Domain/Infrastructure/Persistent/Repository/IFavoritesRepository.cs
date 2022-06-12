using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IFavoritesRepository
    {
        Task<IQueryable<Favorite>> GetAllItemsInFavorite(int accountID);
        Favorite GetItemInFavorite(int accountID, int productID);
        Favorite AddItemToFavorites(Favorite favorite);
        void DeleteItemInFavorite(Favorite favorite);

    }
}
