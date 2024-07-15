////STARIY
using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class GeoObjectController : ControllerBase
    {

        private readonly IGeoObjectService _service;

        public GeoObjectController(IGeoObjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetGeoObjects()
        {
            var geoObjects = await _service.GetGeoObjects();
            if (geoObjects == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No GeoObjects in database");
            }

            return StatusCode(StatusCodes.Status200OK, geoObjects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetGeoObject(Guid id)
        {
            var geoObject = await _service.GetGeoObject(id);

            if (geoObject == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, $"No GeoObject found for id: {id}");
            }

            return StatusCode(StatusCodes.Status200OK, geoObject);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGeoObject(Guid id, GeoObjectDTO geoObjectDTO)
        {
            if (id != geoObjectDTO.Id)
            {
                return BadRequest();
            }

            var dbGeoObject = await _service.UpdateGeoObject(geoObjectDTO);

            if (dbGeoObject == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"{geoObjectDTO.Name} could not be updated");
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<GeoObjectDTO>> PostGeoObject(GeoObjectDTO geoObjectDTO)
        {
            var dbGeoObject = await _service.AddGeoObject(geoObjectDTO);

            if (dbGeoObject == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"{geoObjectDTO.Name} could not be added.");
            }

            return CreatedAtAction("GetGeoObject", new { id = geoObjectDTO.Id }, geoObjectDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGeoObject(Guid id)
        {
            (bool status, string message) = await _service.DeleteGeoObject(id);

            if (status == false)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, message);
            }

            return NoContent();
        }

        [HttpGet("GeoClassifiers")]
        public async Task<ActionResult> GetGeoClassifiers()
        {
            var getClassifiers = await _service.GetGeoClassifiers();
            if (getClassifiers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No GeoClassifier in database");
            }

            return StatusCode(StatusCodes.Status200OK, getClassifiers);
        }

        [HttpGet("GeoClassifier/{id}")]
        public async Task<ActionResult> GetGeoClassifier(Guid id)
        {
            var geoClassifier = await _service.GetGeoClassifier(id);

            if (geoClassifier == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, $"No GeoObject found for id: {id}");
            }

            return StatusCode(StatusCodes.Status200OK, geoClassifier);
        }

        [HttpPost("GeoClassifier")]
        [ActionName(nameof(PostGeoClassifier))]
        public async Task<ActionResult<GeoClassifierDTO>> PostGeoClassifier(GeoClassifierDTO geoClassifierDTO)
        {
            try{
            var dbGeoClassifier = await _service.AddGeoClassifier(geoClassifierDTO);
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
