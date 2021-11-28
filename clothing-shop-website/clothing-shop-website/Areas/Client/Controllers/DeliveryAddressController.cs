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
    public class DeliveryAddressController : ControllerBase
    {
        private UnitOfWork _unitOfWork;

        public DeliveryAddressController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }


        [HttpGet("GetAllDeliveryAddresssByCustomer")]
        public async Task<IActionResult> GetAllDeliveryAddresssByCustomer(int customerId)
        {
            try
            {
                IQueryable<DeliveryAddress> lDeliveryAddress;
                if (customerId > 0)
                {
                    lDeliveryAddress = await _unitOfWork.DeliveryAddressRepository.GetAllDeliveryAddresssByCustomer(customerId);

                    var response = new ResponseJSON<DeliveryAddress>
                    {
                        TotalData = lDeliveryAddress.Count(),
                        Data = lDeliveryAddress.ToList()
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

        [HttpGet("GetlDeliveryAddressByID/{id}")]
        public IActionResult GetDeliveryAddressByID(int id)
        {
            var DeliveryAddress = _unitOfWork.DeliveryAddressRepository.GetDeliveryAddressByID(id);

            if (DeliveryAddress == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(DeliveryAddress);
            }
        }

        [HttpPost]
        public IActionResult CreateDeliveryAddress(DeliveryAddress DeliveryAddress)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.DeliveryAddressRepository.CreateDeliveryAddress(DeliveryAddress);

                if (_unitOfWork.Save())
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("UpdateDeliveryAddress", Name = "UpdateDeliveryAddress")]
        public IActionResult UpdateDeliveryAddress(DeliveryAddress DeliveryAddress)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (DeliveryAddress != null)
                    {
                        
                        _unitOfWork.DeliveryAddressRepository.UpdateDeliveryAddress(DeliveryAddress);
                        if (_unitOfWork.Save())
                        {
                            return Ok(DeliveryAddress);
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                    else return NotFound();
                }
                catch
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("DeleteDeliveryAddress/{id}", Name = "DeleteDeliveryAddress")]
        public IActionResult DeleteDeliveryAddress(int id)
        {
            try
            {
                var DeliveryAddress = _unitOfWork.DeliveryAddressRepository.GetDeliveryAddressByID(id);

                if (DeliveryAddress == null)
                    return NotFound();

                DeliveryAddress.State = 0;
                _unitOfWork.DeliveryAddressRepository.UpdateDeliveryAddress(DeliveryAddress);
                _unitOfWork.Save();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
