using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Mvc;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private UnitOfWork _unitOfWork;

        public DashboardController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet("GetEarningInDay")]
        public IActionResult GetEarningInDay()
        {
            var totalEarningInDay = _unitOfWork.OrdersRepository.GetEarningInDay();

            return Ok(totalEarningInDay);
        }

        [HttpGet("GetTotalBuyProductsInDay")]
        public IActionResult GetTotalBuyProductsInDay()
        {
            var totalBuyInDay = _unitOfWork.OrdersRepository.GetTotalBuyProductsInDay();

            return Ok(totalBuyInDay);
        }

        [HttpGet("GetTotalBuyProductsInMonth")]
        public IActionResult GetTotalBuyProductsInMonth()
        {
            var totalBuyInMonth = _unitOfWork.OrdersRepository.GetTotalBuyProductsInMonth();

            return Ok(totalBuyInMonth);
        }

        [HttpGet("GetProcessOrder")]
        public IActionResult GetProcessOrder()
        {
            var task = _unitOfWork.OrdersRepository.GetProcessOrder();

            return Ok(task);
        }
    }
}