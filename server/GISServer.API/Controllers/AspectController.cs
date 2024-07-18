using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AspectController : ControllerBase
    {

        private readonly IAspectService _aspectService;

        public AspectController(IGeoObjectService service, IAspectService aspectService)
        {
            _aspectService = aspectService;
        }

        [HttpGet("Aspect")]
        public async Task<ActionResult> GetAspect()
        {
            var dbAspects = await _aspectService.GetAspects();
            if (dbAspects == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspects in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbAspects);
        }

        [HttpPost("Aspect")]
        public async Task<ActionResult> PostAspect(AspectDTO aspectDTO)
        {
            aspectDTO.Id = Guid.NewGuid();
            var dbAspect = await _aspectService.AddAspect(aspectDTO);

            if (dbAspect == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The Aspect could not be added.");
            }

            return CreatedAtAction("GetAspect", new { aspectDTO });
        }

        [HttpGet("Aspect/{id}")]
        public async Task<ActionResult> GetAspect(Guid id)
        {
            var dbAspect = await _aspectService.GetAspect(id);
            if (dbAspect == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspect in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbAspect);
        }

        [HttpGet("GeoObjectAspect/{geoObjectId}")]
        public async Task<ActionResult> GetGeoObjectAspects(Guid geoObjectId)
        {
            var dbAspects = await _aspectService.GetGeoObjectAspects(geoObjectId);
            if (dbAspects == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspects of GeoObject in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbAspects);
            
        }

        [HttpPost("GeoObjectAspect")]
        public async Task<ActionResult> PostGeoObjectAspect(Guid geoObjectId, Guid aspectId)
        {
            var dbgeoObject = await _aspectService.AddGeoObjectAspect(geoObjectId, aspectId);
            if (dbgeoObject == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspect or GeoObject in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbgeoObject);
        }


        [HttpGet("CallAspect")]
        public async Task<ActionResult> CallAspect(String endPoint)
        {
            // something
            //
            String reportAspect = _aspectService.CallAspect(endPoint);
            return StatusCode(StatusCodes.Status200OK, reportAspect);
        }
    }
}
