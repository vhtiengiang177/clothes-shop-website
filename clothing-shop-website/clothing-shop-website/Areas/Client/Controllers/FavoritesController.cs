using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Client.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public FavoritesController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet("GetAllItemsInFavorite")]
        public async Task<IActionResult> GetAllItemsInFavorite()
        {
            try
            {
                IQueryable<Favorite> lFavoriteItems;

                List<Product> lProductItems2 = new List<Product>();

                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                lFavoriteItems = await _unitOfWork.FavoritesRepository.GetAllItemsInFavorite(Int32.Parse(userId));

                return Ok(lFavoriteItems);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetFavorite/{idProduct}")]
        public async Task<IActionResult> GetFavorite(int idProduct)
        {
            try
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                Favorite favorite = new Favorite();

                favorite =  _unitOfWork.FavoritesRepository.GetItemInFavorite(Int32.Parse(userId), idProduct);

                return Ok(favorite);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetAllProductsInFavorite")]
        public async Task<IActionResult> GetAllProductsInFavorite()
        {
            try
            {
                IQueryable<Favorite> lFavoriteItems;

                List<Product> lProductItems2 = new List<Product>();

                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                lFavoriteItems = await _unitOfWork.FavoritesRepository.GetAllItemsInFavorite(Int32.Parse(userId));
       
                foreach (var item in lFavoriteItems)
                {
                    Product product = _unitOfWork.ProductsRepository.GetProductByID(item.IdProduct);
                    lProductItems2.Add(product);
                }

                return Ok(lProductItems2);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("AddItemToFavorite/{idProduct}")]
        public IActionResult AddItemToFavorite(int idProduct)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                var typeAccount = User.FindFirst("idTypeAccount").Value;
                if (userId == null) return BadRequest("Register or login to favorite this item");
                if (int.Parse(typeAccount) != 4) return BadRequest("Staff cannot use this function");

                var item = _unitOfWork.FavoritesRepository.GetItemInFavorite(Int32.Parse(userId), idProduct);
                if (item == null)
                {
                    Favorite favorite = new Favorite();
                    favorite.IdProduct = idProduct;
                    favorite.IdAccount = Int32.Parse(userId);

                    _unitOfWork.FavoritesRepository.AddItemToFavorites(favorite);
                    if (_unitOfWork.Save())
                        return Ok(item);
                    return BadRequest();
                }
            }

            return BadRequest("Invalid input");
        }


        [HttpPost("DeleteItemInFavorite/{idProduct}")]
        public IActionResult DeleteItemsInFavorite(int idProduct)
        {
            try
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                var itemObj = _unitOfWork.FavoritesRepository.GetItemInFavorite(Int32.Parse(userId), idProduct);
                if (itemObj == null)
                    return NotFound();

                _unitOfWork.FavoritesRepository.DeleteItemInFavorite(itemObj);
                if (!_unitOfWork.Save())
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("DeleteAllItemInFavorite/{idCustomer}")]
        public async Task<IActionResult> DeleteAllItemInFavorite(int idCustomer)
        {
            try
            {
                IQueryable<Favorite> lFavoriteItems;
                lFavoriteItems = await _unitOfWork.FavoritesRepository.GetAllItemsInFavorite(idCustomer);
                if (lFavoriteItems == null)
                    return NotFound();

                foreach(var item in lFavoriteItems)
                {
                    _unitOfWork.FavoritesRepository.DeleteItemInFavorite(item);
                }
                
                if (!_unitOfWork.Save())
                {
                    return BadRequest();
                }

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
