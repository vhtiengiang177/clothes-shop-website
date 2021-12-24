using Microsoft.AspNetCore.Mvc;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }

        //[HttpGet]
        //public IActionResult GetSalesInMonths()
        //{

        //}
    }
}