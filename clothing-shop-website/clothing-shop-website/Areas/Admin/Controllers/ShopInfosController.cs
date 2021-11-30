using Domain.Entity;
using Infrastructure.Persistent;
using Infrastructure.Persistent.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clothing_shop_website.Areas.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopInfosController : ControllerBase
    {
        private UnitOfWork _unitOfWork;

        public ShopInfosController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllShopInfos()
        {
            try
            {
                IQueryable<ShopInfo> lShopInfos;

                lShopInfos = _unitOfWork.ShopInfosRepository.Get();

                return Ok(lShopInfos.ToList());
            }
            catch
            {
                return BadRequest();
            }

        }
    }
}
