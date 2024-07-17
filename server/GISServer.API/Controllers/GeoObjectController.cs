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
            geoObjectDTO = _service.CreateGuids(geoObjectDTO);

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
        [HttpPost("GeoObjectsClassifiers")]
        public async Task<ActionResult<GeoObjectsGeoClassifiersDTO>> PostGeoObjectsGeoClassifiers(Guid geoObjectId, Guid geoClassifierId)
        {
            try
            {
                var geoObjectsGeoClassifiersDTO = new GeoObjectsGeoClassifiersDTO
                {
                    GeoObjectId = geoObjectId,
                    GeoClassifierId = geoClassifierId
                };

                var dbGeoObjectsGeoClassifiers = await _service.AddGeoObjectsGeoClassifiers(geoObjectsGeoClassifiersDTO);
                if (dbGeoObjectsGeoClassifiers == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
                }

                return CreatedAtAction("GetGeoObjectsGeoClassifiers", new { geoObjectId = geoObjectId, geoClassifierId = geoClassifierId }, geoObjectsGeoClassifiersDTO);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
            }
        }
        [HttpGet("GetObjectsClassifiers")]
        public async Task<ActionResult> GetGeoObjectsGeoClassifiers()
        {
            var getGeoObjectsGeoClassifiers = await _service.GetGeoObjectsGeoClassifiers();
            if (getGeoObjectsGeoClassifiers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No GeoClassifier in database");
            }

            return StatusCode(StatusCodes.Status200OK, getGeoObjectsGeoClassifiers);
        }


        [HttpPost("TopologyLink")]
        public async Task<ActionResult> PostTopologyLink(TopologyLinkDTO topologyLinkDTO)
        {
            Guid guid = Guid.NewGuid();
            topologyLinkDTO.Id = guid;

            var dbTopologyLink = await _service.AddTopologyLink(topologyLinkDTO);

            if (dbTopologyLink == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
            }

            return CreatedAtAction("GetTopologyLinks", new { topologyLinkDTO });
        }

        [HttpGet("TopologyLinks")]
        public async Task<ActionResult> GetTopologyLinks()
        {
            var dbTopologyLinks = await _service.GetTopologyLinks();
            if (dbTopologyLinks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No TopologyLinks in database.");
            }
            
            return StatusCode(StatusCodes.Status200OK, dbTopologyLinks);
        }



    }
}
