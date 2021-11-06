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
    public class MaterialsController : ControllerBase
    {
        private UnitOfWork _unitOfWork;
        public MaterialsController(DataDbContext dbContext)
        {
            _unitOfWork = new UnitOfWork(dbContext);
        }

        [HttpGet]
        public IActionResult GetAllMaterial()
        {
            var lMaterials = _unitOfWork.MaterialsRepository.Get();

            return Ok(lMaterials);
        }


        [HttpGet("{id}")]
        public IActionResult GetlMaterialByID(int id)
        {
            var material = _unitOfWork.MaterialsRepository.GetByID(id);

            if (material == null) {
                return NotFound();
            }
            else {
                return Ok(material);
            }
        }

        [HttpPost]
        public IActionResult CreateMaterial(Material material)
        {
            if (ModelState.IsValid) {
                _unitOfWork.MaterialsRepository.Insert(material);

                if (_unitOfWork.Save()) {
                    return Ok();
                }
                else {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMaterial(Material material)
        {
            if (ModelState.IsValid) {
                try {
                    _unitOfWork.MaterialsRepository.Update(material);
                    if (_unitOfWork.Save()) {
                        return Ok(material);
                    }
                    else {
                        return BadRequest();
                    }
                }
                catch {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMaterial(int id)
        {
            try {
                var material = _unitOfWork.SizesRepository.GetByID(id);

                if (material == null)
                    return NotFound();

                _unitOfWork.MaterialsRepository.Delete(material);
                _unitOfWork.Save();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }
    }
}
