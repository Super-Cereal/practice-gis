using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;
using GeoJSON.Net.Feature;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GISServer.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
 

    public class GeoObjectController : ControllerBase
    {
        private readonly IGeoObjectService _geoObjectService;
        private readonly IGeoObjectClassifiersService _geoObjectClassifierService;
        private readonly PolygonService _polygonService;

        public GeoObjectController(
                IGeoObjectService service,
                IGeoObjectClassifiersService geoObjectClassifierService,
            PolygonService polygonService)
        {
            _geoObjectService = service;
            _geoObjectClassifierService = geoObjectClassifierService;
            _polygonService = polygonService;
        }

        [HttpPost("UnionPolygons")]
        public async Task<ActionResult<Feature>> UnionPolygons([FromBody] PolygonOpDTO request)
        {
            try
            {
                // Логируем запрос
                Console.WriteLine("Received request: " + JsonSerializer.Serialize(request));

                if (request == null)
                {
                    Console.WriteLine("Request is null.");
                    return BadRequest("Request body is null.");
                }

                if (request.Polygon1 == null || request.Polygon2 == null)
                {
                    Console.WriteLine("Invalid request: One or both polygons are null.");
                    return BadRequest("Both Polygon1 and Polygon2 must be provided.");
                }

                Console.WriteLine("Polygon1 des: " + JsonSerializer.Serialize(request.Polygon1));
                Console.WriteLine("Polygon2 des: " + JsonSerializer.Serialize(request.Polygon2));

                // Логируем перед вызовом сервиса
                Console.WriteLine("Calling GeoObjectService.UnionPolygons...");
                Console.WriteLine("....................................................." + request);
                var result = await _geoObjectService.UnionPolygons(request.Polygon1, request.Polygon2);

                // Логируем результат
                Console.WriteLine("Union operation result: " + JsonSerializer.Serialize(result));

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Логируем исключение
                Console.WriteLine("Exception occurred: " + ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost("IntersectPolygons")]
        public async Task<ActionResult<Feature>> IntersectPolygons([FromBody] PolygonOpDTO request)
        {
            try
            {
                var result = await _geoObjectService.IntersectPolygons(request.Polygon1, request.Polygon2);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
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


        [HttpPost("AddClassifier")]
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
                    Console.WriteLine("Problem's here");
                    return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
                }

                return StatusCode(StatusCodes.Status200OK, geoObjectsClassifiersDTO);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
            }
        }

        [HttpDelete("DeleteClassifier")]
        public async Task<IActionResult> DeleteGeoObject(Guid geoObjectId, Guid classifierId)
        {
            (bool status, string message) = await _geoObjectClassifierService.DeleteGeoObjectClassifier(geoObjectId, classifierId);

            if (status == false)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, message);
            }

            return NoContent();
        }

      
        [HttpGet("GetAspects/{id}")]
        public async Task<ActionResult> GetGeoObjectAspects(Guid geoObjectId)
        {
            var dbAspects = await _geoObjectService.GetGeoObjectAspects(geoObjectId);
            if (dbAspects == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspects of GeoObject in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbAspects);
            
        }

        [HttpPost("AddAspect")]
        public async Task<ActionResult> PostGeoObjectAspect(Guid geoObjectId, Guid aspectId)
        {
            var dbgeoObject = await _geoObjectService.AddGeoObjectAspect(geoObjectId, aspectId);
            if (dbgeoObject == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Aspect or GeoObject in database.");
            }
            return StatusCode(StatusCodes.Status200OK, dbgeoObject);
        }
    }
}
