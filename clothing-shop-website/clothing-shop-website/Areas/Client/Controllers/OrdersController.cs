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

        [HttpGet("GetAllOrdersByState")]
        public async Task<IActionResult> GetOrdersByStates([FromQuery] FilterParamsOrder filterParams)
        {
            try
            {
                int currentPageIndex = filterParams.PageIndex ?? 1;
                int currentPageSize = filterParams.PageSize ?? 5;

                IQueryable<Order> lOrderItems;

                lOrderItems = await _unitOfWork.OrdersRepository.GetAllOrdersByState(filterParams.IdState);
                if (filterParams.Content != "")
                {
                    lOrderItems = _ordersService.FilterOrder(filterParams, lOrderItems);
                }

                lOrderItems = _ordersService.FilterOrder(filterParams, lOrderItems);

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
                        Data = lOrderItems.Reverse().ToList()
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
                if (order == null) return NotFound();

                var userIdString = User.FindFirst("id").Value;
                if (userIdString == null) return BadRequest();

                var userId = int.Parse(userIdString);

                IQueryable<OrderDetail> lOrderItems;

                switch (state)
                {
                    case 2: // approval
                        order.IdStaff = userId;
                        break;
                    case 3: // pick up
                        order.IdShipper = userId;
                        break;
                    case 4: // delivery
                        order.DateShip = DateTime.Now;
                        break;
                    case 5: // completed
                        if (order.DatePayment == null)
                        {
                            order.DatePayment = DateTime.Now;
                        }
                        break;
                    case 6: // cancelled
                        order.CancelBy = userId;
                        order.DateCancel = DateTime.Now;

                        lOrderItems = _unitOfWork.OrdersRepository.GetAllOrderDetailByOrder2(order.Id);

                        foreach (var item in lOrderItems)
                        {
                            var ProductItem = _unitOfWork.ProductsRepository.GetItemByIdPSC(item.IdProduct, item.IdSize, item.IdColor);
                            ProductItem.Stock += item.Quantity;
                            _unitOfWork.ProductSizeColorsRepository.Update(ProductItem);
                        }
                        break;
                    case 7: // return refund
                        order.CancelBy = userId;
                        order.DateCancel = DateTime.Now;

                        lOrderItems = _unitOfWork.OrdersRepository.GetAllOrderDetailByOrder2(order.Id);
                        foreach (var item in lOrderItems)
                        {
                            var ProductItem = _unitOfWork.ProductsRepository.GetItemByIdPSC(item.IdProduct, item.IdSize, item.IdColor);
                            ProductItem.Stock += item.Quantity;
                            _unitOfWork.ProductSizeColorsRepository.Update(ProductItem);
                        }
                        break;
                }

                order.State = state;
                _unitOfWork.OrdersRepository.UpdateOrder(order);
                _unitOfWork.Save();

                return Ok(order);

                /////////////////////////////////
                //IQueryable<OrderDetail> lOrderItems;

                //lOrderItems =_unitOfWork.OrdersRepository.GetAllOrderDetailByOrder2(order.Id);

                //if (order == null)
                //    return NotFound();

                //var userId = User.FindFirst("id").Value;
                //if (userId == null) return BadRequest();

                //var typeUser = int.Parse(User.FindFirst("idTypeAccount").Value);

                //if (typeUser != 4)
                //{
                //    if (state == 3 || state == 4 || state == 5) // Pick up, delivery, completed
                //        order.IdShipper = int.Parse(userId);
                //    else if (state == 6)
                //    {
                //        order.IdStaff = int.Parse(userId);
                //        order.CancelBy = int.Parse(userId);
                //    }
                //    else
                //        order.IdStaff = int.Parse(userId);
                //}
                //else
                //{
                //    if (state == 6) // Cancel 
                //    {
                //        order.CancelBy = int.Parse(userId);
                //    }
                //}

                //if (state == 4)
                //{
                //    order.DateShip = DateTime.Now;
                //}
                //if (state == 5)
                //{
                //    if (order.DatePayment == null)
                //    {
                //        order.DatePayment = DateTime.Now;
                //    }
                //}
                //if (state == 6 || state == 7)
                //{
                //    //foreach (var item in lOrderItems)
                //    //{
                //    //    var ProductItem = _unitOfWork.ProductsRepository.GetItemByIdPSC(item.IdProduct, item.IdSize, item.IdColor);
                //    //    ProductItem.Stock -= item.Quantity;
                //    //    _unitOfWork.ProductSizeColorsRepository.Update(ProductItem);
                //    //}
                //    order.DateCancel = DateTime.Now;
                //}

            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("AddOrder")]
        public IActionResult AddOrder(OrderDetail[] orderDetails, [FromQuery] int idAddress, [FromQuery] int? idPromotion, [FromQuery] int paymentMethod)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                var order = new Order();
                var dateTimeNow = DateTime.Now;
                order.IdCustomer = int.Parse(userId);
                order.State = 1;
                order.DateOrder = dateTimeNow;
                order.FeeDelivery = 0;
                order.IdAddress = idAddress;
                if (paymentMethod == 1)
                {
                    order.DatePayment = dateTimeNow;
                }

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
                    totalProductPrice += orderDetail.UnitPrice * orderDetail.Quantity;
                    totalAmount += orderDetail.PricePromotion * orderDetail.Quantity;
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

        [AllowAnonymous]
        [HttpGet("GetDataChartAmout")]
        public IActionResult GetDataChartAmout([FromQuery] int choose, [FromQuery] int year)
        {
            try
            {
                if (year == 1)
                    year = 2021;
                if (year == 2)
                    year = 2022;
                double[] arrData = new double[1];

                switch (choose)
                {
                    case 1://day
                        var lOrders = _unitOfWork.OrdersRepository.GetDataAmount(choose,year);
                        arrData = new double[7];
                        double day = -1;
                        DateTime fromDate = _unitOfWork.OrdersRepository.StartOfWeek(DateTime.Now, DayOfWeek.Monday);
                       
                        foreach ( var item in lOrders)
                        {
                            DateTime updatedTime = (Convert.ToDateTime(item.DatePayment)).Date;

                            day = (updatedTime - fromDate).TotalDays;
                            
                            switch (day)
                            {
                                case 0:
                                    arrData[0] += item.TotalAmount;
                                    break;
                                case 1:
                                    arrData[1] += item.TotalAmount;
                                    break;
                                case 2:
                                    arrData[2] += item.TotalAmount;
                                    break;
                                case 3:
                                    arrData[3] += item.TotalAmount;
                                    break;
                                case 4:
                                    arrData[4] += item.TotalAmount;
                                    break;
                                case 5:
                                    arrData[5] += item.TotalAmount;
                                    break;
                                case 6:
                                    arrData[6] += item.TotalAmount;
                                    break;
                            }    
                        }
                        break;
                    case 2://month
                        var lOrders2 = _unitOfWork.OrdersRepository.GetDataAmount(choose, year);
                        arrData = new double[12];
                        foreach (var item in lOrders2)
                        {
                            DateTime updatedTime = Convert.ToDateTime(item.DatePayment);
                            arrData[updatedTime.Month-1] += item.TotalAmount;
                        }
                        break;
                    case 3://quater
                        var lOrders3 = _unitOfWork.OrdersRepository.GetDataAmount(choose, year);
                        arrData = new double[4];
                        foreach (var item in lOrders3)
                        {
                             DateTime updatedTime = Convert.ToDateTime(item.DatePayment);
                            if ((updatedTime.Month == 1) || (updatedTime.Month == 2) || (updatedTime.Month == 3))
                                arrData[0] += item.TotalAmount;
                            if ((updatedTime.Month == 4) || (updatedTime.Month == 5) || (updatedTime.Month == 6))
                                arrData[1] += item.TotalAmount;
                            if ((updatedTime.Month == 7) || (updatedTime.Month == 8) || (updatedTime.Month == 9))
                                arrData[2] += item.TotalAmount;
                            if ((updatedTime.Month == 10) || (updatedTime.Month == 11) || (updatedTime.Month == 12))
                                arrData[3] += item.TotalAmount;
                        }
                        break;
                    case 4://year
                        var lOrders4 = _unitOfWork.OrdersRepository.GetDataAmount(choose, 2021);
                        arrData = new double[2];
                        foreach (var item in lOrders4)
                        {
                            DateTime updatedTime = Convert.ToDateTime(item.DatePayment);
                            if (updatedTime.Year == 2021)
                                arrData[0] += item.TotalAmount;
                            if (updatedTime.Year == 2022)
                                arrData[1] += item.TotalAmount;
                        }
                        break;

                }
                return Ok(arrData);

            }
            catch
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpGet("GetDataChartOrders")]
        public IActionResult GetDataChartOrders([FromQuery] int choose, [FromQuery] int year)
        {
            try
            {
                if (year == 1)
                    year = 2021;
                if (year == 2)
                    year = 2022;

                double[] arrDataCompleted = new double[1];
                double[] arrDataCancelReturn = new double[1];

                ChartOrders list = new ChartOrders();

                switch (choose)
                {
                    case 1://day
                        arrDataCompleted = new double[7];
                        arrDataCancelReturn = new double[7];
                        DateTime fromDate = _unitOfWork.OrdersRepository.StartOfWeek(DateTime.Now, DayOfWeek.Monday);

                       for (int day = 1; day < 8; day++)
                        {
                            arrDataCompleted[day - 1] = _unitOfWork.OrdersRepository.GetDataOrdersCompleted(fromDate.AddDays(day-1), fromDate.AddDays(day));
                            arrDataCancelReturn[day - 1] = _unitOfWork.OrdersRepository.GetDataOrdersCancelReturn(fromDate.AddDays(day - 1), fromDate.AddDays(day));
                        }     

                        break;
                    case 2://month
                        arrDataCompleted = new double[12];
                        arrDataCancelReturn = new double[12];

                        for (int month = 1; month < 13; month++)
                        {
                            var fromDate2 = new DateTime(year,month , 1);
                            var toDate = fromDate2.AddMonths(1).AddDays(-1);
                            arrDataCompleted[month - 1] = _unitOfWork.OrdersRepository.GetDataOrdersCompleted(fromDate2,toDate);
                            arrDataCancelReturn[month - 1] = _unitOfWork.OrdersRepository.GetDataOrdersCancelReturn(fromDate2,toDate);
                        }
                        break;
                    case 3://quater
                        arrDataCompleted = new double[4];
                        arrDataCancelReturn = new double[4];

                        int startMonth = 0;

                        for (int quater = 1; quater < 5; quater++)
                        {
                            switch(quater)
                            {
                                case 1:
                                    startMonth = 1;
                                    break;
                                case 2:
                                    startMonth = 4;
                                    break;
                                case 3:
                                    startMonth = 7;
                                    break;
                                case 4:
                                    startMonth = 10;
                                    break;
                            }    
                            var fromDate2 = new DateTime(year, startMonth, 1);
                            var toDate = fromDate2.AddMonths(3).AddDays(-1);
                            arrDataCompleted[quater - 1] = _unitOfWork.OrdersRepository.GetDataOrdersCompleted(fromDate2, toDate);
                            arrDataCancelReturn[quater - 1] = _unitOfWork.OrdersRepository.GetDataOrdersCancelReturn(fromDate2, toDate);
                        }

                        break;
                    case 4://year
                        arrDataCompleted = new double[2];
                        arrDataCancelReturn = new double[2];

                        DateTime fromDate3 = new DateTime(2021, 1, 1);
                        DateTime toDate3 = new DateTime(2021, 12, 31);
                        arrDataCompleted[0] = _unitOfWork.OrdersRepository.GetDataOrdersCompleted(fromDate3, toDate3);
                        arrDataCancelReturn[0] = _unitOfWork.OrdersRepository.GetDataOrdersCancelReturn(fromDate3, toDate3);

                        DateTime fromDate4 = new DateTime(2022, 1, 1);
                        DateTime toDate4 = new DateTime(2022, 12, 31);
                        arrDataCompleted[1] = _unitOfWork.OrdersRepository.GetDataOrdersCompleted(fromDate4, toDate4);
                        arrDataCancelReturn[1] = _unitOfWork.OrdersRepository.GetDataOrdersCancelReturn(fromDate4, toDate4);
                        break;

                }

                var response = new ChartOrders
                {
                    OrdersCompleted = arrDataCompleted,
                    OrdersCancelReturn = arrDataCancelReturn
                };

                return Ok(response);

            }
            catch
            {
                return BadRequest();
            }
        }
    }

}
