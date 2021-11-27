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
    public class OrdersController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        private OrdersService _ordersService;

        public OrdersController(DataDbContext dbContext, OrdersService ordersService)
        {
            _unitOfWork = new UnitOfWork(dbContext);
            _ordersService = ordersService;
        }

        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders([FromQuery] FilterParamsOrder filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Order> lOrderItems;

                if (filterParams.lStates != null)
                {
                    if (filterParams.lStates.Count() != 0
                        || filterParams.lStates.Count() != _unitOfWork.CategoriesRepository.Count())
                    {
                        lOrderItems = _unitOfWork.OrdersRepository.GetOrdersByStates(filterParams.lStates);
                    }
                    else lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrders();
                }
                else lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrders();

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

        [HttpGet("GetAllOrdersByCustomerAndState")]
        public async Task<IActionResult> GetAllOrdersByCustomerAndState(int customerId,int state)
        {
            try
            {
                IQueryable<Order> lOrderItems;
                if (customerId > 0 && state>0)
                {
                    lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrdersByCustomerAndState(customerId, state);

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
    }
}
