﻿using clothing_shop_website.Model;
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

        [HttpGet]
        public async Task<IActionResult> GetAllDeliveryAddress()
        {
            try
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                int idCustomer = int.Parse(userId);
                IQueryable<DeliveryAddress> lDeliveryAddress;

                lDeliveryAddress = await _unitOfWork.DeliveryAddressRepository.GetAllDeliveryAddresssByCustomer(idCustomer);

                return Ok(lDeliveryAddress);
            }
            catch
            {
                return BadRequest();
            }
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

        [HttpGet("GetDeliveryAddressByID/{id}")]
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

        [HttpPost("CreateDeliveryAddress")]
        public IActionResult CreateDeliveryAddress(DeliveryAddress deliveryAddress)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("id").Value;
                if (userId == null) return BadRequest();

                deliveryAddress.IdCustomer = int.Parse(userId);

                var result = _unitOfWork.DeliveryAddressRepository.CreateDeliveryAddress(deliveryAddress);

                if (_unitOfWork.Save())
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("UpdateDeliveryAddress/{id}", Name = "UpdateDeliveryAddress")]
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
