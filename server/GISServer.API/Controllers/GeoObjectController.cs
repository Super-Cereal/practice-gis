using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;
using GeoJSON.Net.Feature;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using GeoJSON.Net.Geometry;

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



        //////////////////////////////////////////////////////////////////////////
        [HttpPost("UnionPolygons")]
        public async Task<ActionResult<Feature>> UnionPolygons([FromBody] PolygonOpDTO request)
        {
            try
            {
                if (request == null || request.Polygon1 == null || request.Polygon2 == null)
                {
                    return BadRequest("Both Polygon1 and Polygon2 must be provided.");
                }

                // Логируем входные данные
                Console.WriteLine($"Polygon1: {JsonSerializer.Serialize(request.Polygon1)}");
                Console.WriteLine($"Polygon2: {JsonSerializer.Serialize(request.Polygon2)}");

                // Преобразуем PolygonDTO в GeoJSON Polygon
                var polygon1 = ConvertToGeoJsonPolygon(request.Polygon1);
                var polygon2 = ConvertToGeoJsonPolygon(request.Polygon2);

                // Логируем преобразованные данные
                Console.WriteLine($"Converted Polygon1 GeoJSON: {JsonSerializer.Serialize(polygon1)}");
                Console.WriteLine($"Converted Polygon2 GeoJSON: {JsonSerializer.Serialize(polygon2)}");

                // Создаем FeatureCollection
                var featureCollection = CreateFeatureCollection(polygon1, polygon2);

                // Вызываем сервис для объединения
                var result = await _geoObjectService.UnionPolygons(featureCollection);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("IntersectPolygons")]
        public async Task<ActionResult<Feature>> IntersectPolygons([FromBody] PolygonOpDTO request)
        {
            try
            {
                if (request == null || request.Polygon1 == null || request.Polygon2 == null)
                {
                    return BadRequest("Both Polygon1 and Polygon2 must be provided.");
                }

                var polygon1 = ConvertToGeoJsonPolygon(request.Polygon1);
                var polygon2 = ConvertToGeoJsonPolygon(request.Polygon2);

                // Создаем FeatureCollection
                var featureCollection = CreateFeatureCollection(polygon1, polygon2);

                // Вызываем сервис для пересечения
                var result = await _geoObjectService.IntersectPolygons(featureCollection);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private GeoJSON.Net.Geometry.Polygon ConvertToGeoJsonPolygon(PolygonDTO polygonDTO)
        {
            // Преобразуем координаты в LineString
            var lineStrings = polygonDTO.Coordinates.Select(line =>
            {
                // Замкнем контур, если нужно
                if (!line[0].SequenceEqual(line[line.Count - 1]))
                {
                    line.Add(line[0]);  // Замкнем контур
                }

                // Преобразуем координаты в LineString (GeoJSON формат)
                return new GeoJSON.Net.Geometry.LineString(line.Select(coord => new GeoJSON.Net.Geometry.Position(coord[0], coord[1])).ToList());
            }).ToList();

            // Создаем и возвращаем GeoJSON Polygon
            return new GeoJSON.Net.Geometry.Polygon(lineStrings);
        }

        private FeatureCollection CreateFeatureCollection(GeoJSON.Net.Geometry.Polygon polygon1, GeoJSON.Net.Geometry.Polygon polygon2)
        {
            var features = new List<Feature>
    {
        new Feature(polygon1),
        new Feature(polygon2)
    };

            return new FeatureCollection(features);
        }




        /// ////////////////////////////////////////////////////////////

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
