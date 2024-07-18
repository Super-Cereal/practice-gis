using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class GOCController : ControllerBase
    {

        private readonly IGeoObjectClassifierService _geoObjectClassifierService;

        public GOCController(IGeoObjectService service)
        {
            _geoObjectService = service;
        }

        [HttpGet("GeoObjectsClassifiers")]
        public async Task<ActionResult> GetGeoObjectsClassifiers()
        {
            var getGeoObjectsClassifiers = await _geoObjectService.GetGeoObjectsClassifiers();
            if (getGeoObjectsClassifiers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No Classifier in database");
            }

            return StatusCode(StatusCodes.Status200OK, getGeoObjectsClassifiers);
        }

        [HttpPost("GeoObjectsClassifiers")]
        public async Task<ActionResult<GeoObjectsClassifiersDTO>> PostGeoObjectsClassifiers(Guid geoObjectId, Guid classifierId)
        {
            try
            {
                var geoObjectsClassifiersDTO = new GeoObjectsClassifiersDTO
                {
                    GeoObjectId = geoObjectId,
                    ClassifierId = classifierId
                };

                var dbGeoObjectsClassifiers = await _geoObjectService.AddGeoObjectsClassifiers(geoObjectsClassifiersDTO);
                if (dbGeoObjectsClassifiers == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
                }

                return CreatedAtAction("GetGeoObjectsClassifiers", new { geoObjectId = geoObjectId, classifierId = classifierId }, geoObjectsClassifiersDTO);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
            }
        }
    }
}
