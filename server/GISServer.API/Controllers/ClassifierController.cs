using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ClassifierController : ControllerBase 
    {

        private readonly IClassifierService _classifierService;

        public GeoObjectController(IClassifierService classifierService)
        {
            _classifierService = classifierService;
        }

        [HttpGet("GeoClassifier")]
        public async Task<ActionResult> GetGeoClassifier()
        {
            var getClassifiers = await _classifierService.GetGeoClassifiers();
            if (getClassifiers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No GeoClassifiers in database");
            }

            return StatusCode(StatusCodes.Status200OK, getClassifiers);
        }

        [HttpGet("GeoClassifier/{id}")]
        public async Task<ActionResult> GetGeoClassifier(Guid id)
        {
            var geoClassifier = await _classifierService.GetGeoClassifier(id);

            if (geoClassifier == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, $"No GeoObject found for id: {id}");
            }

            return StatusCode(StatusCodes.Status200OK, geoClassifier);
        }

        [HttpPost("GeoClassifier")]
        public async Task<ActionResult<GeoClassifierDTO>> PostGeoClassifier(GeoClassifierDTO geoClassifierDTO)
        {
            try{
            var dbGeoClassifier = await _classifierService.AddGeoClassifier(geoClassifierDTO);
            if (dbGeoClassifier == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"{geoClassifierDTO.Name} could not be added.");
            }
            return CreatedAtAction("GetGeoClassifier", new {id = geoClassifierDTO.Id}, new {geoClassifierDTO});
            }
            catch(Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"{geoClassifierDTO.Name} could not be added.");
            }
        }
    }
}
