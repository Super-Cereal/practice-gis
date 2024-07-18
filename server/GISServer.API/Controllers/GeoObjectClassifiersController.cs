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

        private readonly IGeoObjectService _geoObjectService;
        private readonly IClassifierService _classifierService;
        private readonly ITopologyService _topologyService;
        private readonly IAspectService _aspectService;
        private readonly IGeoObjectClassifierService _geoObjectClassifierService;

        public GeoObjectController(IGeoObjectService service)
        {
            _geoObjectService = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetGeoObjects()
        {
            var geoObjects = await _geoObjectService.GetGeoObjects();
            if (geoObjects == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No GeoObjects in database");
            }

            return StatusCode(StatusCodes.Status200OK, geoObjects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetGeoObject(Guid id)
        {
            var geoObject = await _geoObjectService.GetGeoObject(id);

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

            var dbGeoObject = await _geoObjectService.UpdateGeoObject(geoObjectDTO);

            if (dbGeoObject == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"{geoObjectDTO.Name} could not be updated");
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<GeoObjectDTO>> PostGeoObject(GeoObjectDTO geoObjectDTO)
        {
            geoObjectDTO = _geoObjectService.CreateGuids(geoObjectDTO);

            var dbGeoObject = await _geoObjectService.AddGeoObject(geoObjectDTO);

            if (dbGeoObject == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"{geoObjectDTO.Name} could not be added.");
            }

            return CreatedAtAction("GetGeoObject", new { id = geoObjectDTO.Id }, geoObjectDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGeoObject(Guid id)
        {
            (bool status, string message) = await _geoObjectService.DeleteGeoObject(id);

            if (status == false)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, message);
            }

            return NoContent();
        }

        [HttpGet("GeoClassifier")]
        public async Task<ActionResult> GetGeoClassifier()
        {
            var getClassifiers = await _geoObjectService.GetGeoClassifiers();
            if (getClassifiers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No GeoClassifiers in database");
            }

            return StatusCode(StatusCodes.Status200OK, getClassifiers);
        }

        [HttpGet("GeoClassifier/{id}")]
        public async Task<ActionResult> GetGeoClassifier(Guid id)
        {
            var geoClassifier = await _geoObjectService.GetGeoClassifier(id);

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
            var dbGeoClassifier = await _geoObjectService.AddGeoClassifier(geoClassifierDTO);
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

        [HttpGet("GeoObjectsClassifiers")]
        public async Task<ActionResult> GetGeoObjectsGeoClassifiers()
        {
            var getGeoObjectsGeoClassifiers = await _geoObjectService.GetGeoObjectsGeoClassifiers();
            if (getGeoObjectsGeoClassifiers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No GeoClassifier in database");
            }

            return StatusCode(StatusCodes.Status200OK, getGeoObjectsGeoClassifiers);
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

                var dbGeoObjectsGeoClassifiers = await _geoObjectService.AddGeoObjectsGeoClassifiers(geoObjectsGeoClassifiersDTO);
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

        [HttpGet("TopologyLink")]
        public async Task<ActionResult> GetTopologyLinks()
        {
            var dbTopologyLinks = await _geoObjectService.GetTopologyLinks();
            if (dbTopologyLinks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No TopologyLinks in database.");
            }
            
            return StatusCode(StatusCodes.Status200OK, dbTopologyLinks);
        }

        [HttpPost("TopologyLink")]
        public async Task<ActionResult> PostTopologyLink(TopologyLinkDTO topologyLinkDTO)
        {
            Guid guid = Guid.NewGuid();
            topologyLinkDTO.Id = guid;

            var dbTopologyLink = await _geoObjectService.AddTopologyLink(topologyLinkDTO);

            if (dbTopologyLink == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
            }

            return CreatedAtAction("GetTopologyLinks", new { topologyLinkDTO });
        }

        [HttpGet("Aspect")]
        public async Task<ActionResult> GetAspect()
        {
            var dbAspects = await _geoObjectService.GetAspects();
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
            var dbAspect = await _geoObjectService.AddAspect(aspectDTO);

            if (dbAspect == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The Aspect could not be added.");
            }

            return CreatedAtAction("GetAspect", new { aspectDTO });
        }

        [HttpGet("Aspect/{id}")]
        public async Task<ActionResult> GetAspect(Guid id)
        {
            var dbAspect = await _geoObjectService.GetAspect(id);
            if (dbAspect == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspect in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbAspect);
        }

        [HttpGet("GeoObjectAspect/{geoObjectId}")]
        public async Task<ActionResult> GetGeoObjectAspects(Guid geoObjectId)
        {
            var dbAspects = await _geoObjectService.GetGeoObjectAspects(geoObjectId);
            if (dbAspects == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspects of GeoObject in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbAspects);
            
        }

        [HttpPost("GeoObjectAspect")]
        public async Task<ActionResult> PostGeoObjectAspect(Guid geoObjectId, Guid aspectId)
        {
            var dbgeoObject = await _geoObjectService.AddGeoObjectAspect(geoObjectId, aspectId);
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
            String reportAspect = _geoObjectService.CallAspect(endPoint);
            return StatusCode(StatusCodes.Status200OK, reportAspect);
        }
    }
}
