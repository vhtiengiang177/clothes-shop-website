using clothing_shop_website.Model;
using clothing_shop_website.Services;
using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace clothing_shop_website.Areas.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;

        public CartsController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet("GetAllItemsInCart")]
        public async Task<IActionResult> GetAllItemsInCart(int customerId)
        {
            try
            {
                IQueryable<Cart> lProductItems;
                if ( customerId > 0 )
                {
                    lProductItems = await _unitOfWork.CartsRepository.GetAllItemsInCart(customerId);

                    var response = new ResponseJSON<Cart>
                    {
                        TotalData = lProductItems.Count(),
                        Data = lProductItems.ToList()
                    };

                    return Ok(response);
                }
                return BadRequest();
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPost("AddItemToCart")]
        public IActionResult AddItemToCart(Cart cart)
        {
            if (ModelState.IsValid)
            {
                var item = _unitOfWork.CartsRepository.GetItemInCart(cart.IdCustomer, cart.IdProduct, cart.IdSize, cart.IdColor);
                if (item != null)
                {
                    item.Quantity += cart.Quantity;
                    _unitOfWork.CartsRepository.UpdateCart(item);
                    if (_unitOfWork.Save())
                        return Ok(item);
                }
                else
                {
                    _unitOfWork.CartsRepository.AddItemToCart(cart);
                    if (_unitOfWork.Save())
                        return Ok(item);
                    return BadRequest();
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPut("UpdateQuantityItemInCart", Name = "UpdateQuantityItemInCart")]
        public IActionResult UpdateQuantityItemInCart(Cart itemObj)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (itemObj != null)
                    {
                        var item = _unitOfWork.CartsRepository.GetItemInCart(itemObj.IdCustomer, itemObj.IdProduct, itemObj.IdSize, itemObj.IdColor);
                        if (item != null) 
                        {
                            item.Quantity = itemObj.Quantity;
                            _unitOfWork.CartsRepository.UpdateCart(item);
                            if (!_unitOfWork.Save())
                            {
                                return BadRequest();
                            }
                            return Ok(itemObj);
                        }
                        return BadRequest();
                    }
                }
                catch
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        public IActionResult DeleteItemInCart(Cart[] litems)
        {
            try
            {
                foreach (var item in litems)
                {
                    var itemObj = _unitOfWork.CartsRepository.GetItemInCart(item.IdCustomer, item.IdProduct, item.IdSize, item.IdColor);
                    if (itemObj == null)
                        return NotFound();

                    _unitOfWork.CartsRepository.DeleteItemInCart(itemObj);
                    if (!_unitOfWork.Save())
                    {
                        return BadRequest();
                    }
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
