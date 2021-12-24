using clothing_shop_website.Model;
using clothing_shop_website.Services;
using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Client
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private OrdersService _ordersService;

        public OrdersController(DataDbContext dbContext, OrdersService ordersService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _ordersService = ordersService;
        }

        [AllowAnonymous]
        [HttpGet("GetAllOrdersByState")]
        public async Task<IActionResult> GetOrdersByStates([FromQuery] FilterParamsOrder filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Order> lOrderItems;

                lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrdersByState(filterParams.IdState);

                var lOrder = _ordersService.SortListOrder(filterParams.Sort, lOrderItems);

                var response = new ResponseJSON<Order>
                {
                    TotalData = lOrder.Count(),
                    Data = lOrder.Skip((currentPageIndex - 1) * currentPageSize).Take(currentPageSize).ToList()
                };

                return Ok(response);
            }
            catch
            {
                return BadRequest();
            }

        }

        [AllowAnonymous]
        [HttpGet("GetOrderByID/{id}", Name = "GetOrderByID")]
        public IActionResult GetOrderByID(int id)
        {
            var order = _unitOfWork.OrdersRepository.GetOrderByID(id);

            if (order == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(order);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetAllOrders", Name = "GetAllOrders")]
        public IActionResult GetAllOrders()
        {
            var lorders = _unitOfWork.OrdersRepository.GetAllOrders();

            if (lorders == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(lorders);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetAllOrdersByCustomer")]
        public async Task<IActionResult> GetAllOrdersByCustomer(int customerId)
        {
            try
            {
                IQueryable<Order> lOrderItems;
                if (customerId > 0)
                {
                    lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrdersByCustomer(customerId);

                    var response = new ResponseJSON<Order>
                    {
                        TotalData = lOrderItems.Count(),
                        Data = lOrderItems.ToList()
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

      
        [HttpGet("GetAllOrdersByStateUser/{id}")]
        public async Task<IActionResult> GetAllOrdersByCustomerAndState(int id)
        {
            try
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();
                IQueryable<Order> lOrderItems;
                if (id >0)
                {
                    lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrdersByCustomerAndState(Convert.ToInt32(userId), id);

                    var response = new ResponseJSON<Order>
                    {
                        TotalData = lOrderItems.Count(),
                        Data = lOrderItems.ToList()
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

        [AllowAnonymous]
        [HttpGet("GetAllOrderDetailByOrder/{id}")]
        public async Task<IActionResult> GetAllOrderDetailByOrder(int id)
        {
            try
            {
                IQueryable<OrderDetail> lOrderItems;
                
                    lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrderDetailByOrder(id);

                    var response = new ResponseJSON<OrderDetail>
                    {
                        TotalData = lOrderItems.Count(),
                        Data = lOrderItems.ToList()
                    };

                    return Ok(response);
               
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPut("UpdateState/{id}/{state}", Name = "UpdateState")]
        public IActionResult UpdateState(int id, int state)
        {
            try
            {
                var order = _unitOfWork.OrdersRepository.GetOrderByID(id);
                IQueryable<OrderDetail> lOrderItems;

                lOrderItems =_unitOfWork.OrdersRepository.GetAllOrderDetailByOrder2(order.Id);

                if (order == null)
                    return NotFound();

                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();


                if (state == 3 || state == 4 || state == 5)
                    order.IdShipper = int.Parse(userId);
                else
                    order.IdStaff = int.Parse(userId);

                if (state == 4)
                {
                    order.DateShip = DateTime.Now;
                }
                if (state == 5)
                {
                    order.DatePayment = DateTime.Now;
                }
                if (state == 6 || state == 7)
                {
                    foreach (var item in lOrderItems)
                    {
                        var ProductItem = _unitOfWork.ProductsRepository.GetItemByIdPSC(item.IdProduct, item.IdSize, item.IdColor);
                        ProductItem.Stock -= item.Quantity;
                        _unitOfWork.ProductSizeColorsRepository.Update(ProductItem);
                    }
                    order.DateCancel = DateTime.Now;
                }

                order.State = state;
                _unitOfWork.OrdersRepository.UpdateOrder(order);
                _unitOfWork.Save();

                return Ok(order);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("AddOrder")]
        public IActionResult AddOrder(OrderDetail[] orderDetails, [FromQuery] int idAddress, [FromQuery] int? idPromotion)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                var order = new Order();
                order.IdCustomer = int.Parse(userId);
                order.State = 1;
                order.DateOrder = DateTime.Now;
                order.FeeDelivery = 0;
                order.IdAddress = idAddress;

                var result = _unitOfWork.OrdersRepository.CreateOrder(order);
                _unitOfWork.Save();

                int totalQuantity = 0;
                double totalProductPrice = 0;
                double totalAmount = order.FeeDelivery;

                var lProductOutOfStock = new List<Product>();

                foreach (var orderDetail in orderDetails)
                {
                    orderDetail.IdOrder = result.Id;
                    _unitOfWork.OrderDetailRepository.Create(orderDetail);
                    _unitOfWork.Save();
                    totalQuantity += orderDetail.Quantity;
                    totalProductPrice += orderDetail.UnitPrice;
                    totalAmount += orderDetail.UnitPrice;
                    var productItem = _unitOfWork.ProductsRepository.GetItemByIdPSC(orderDetail.IdProduct, orderDetail.IdSize, orderDetail.IdColor);
                    productItem.Stock -= orderDetail.Quantity;
                    if (productItem.Stock < 0)
                    {
                        var product = _unitOfWork.ProductsRepository.GetProductByID(productItem.IdProduct);
                        lProductOutOfStock.Add(product);

                    } 
                    else _unitOfWork.ProductSizeColorsRepository.Update(productItem);
                }

                if (lProductOutOfStock.Count > 0)
                {
                    return BadRequest(lProductOutOfStock);
                }

                if (idPromotion.HasValue)
                {
                    var promotion = _unitOfWork.PromotionsRepository.GetPromotionByID(idPromotion.Value);
                    totalAmount = totalAmount - totalAmount * promotion.Value;
                }
                result.TotalQuantity = totalQuantity;
                result.TotalProductPrice = totalProductPrice;
                result.TotalAmount = totalAmount - order.FeeDelivery;
                result.IdPromotion = idPromotion;
                _unitOfWork.OrdersRepository.UpdateOrder(result);
                _unitOfWork.Save();

                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}
