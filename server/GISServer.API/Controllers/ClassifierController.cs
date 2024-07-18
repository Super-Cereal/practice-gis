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

        public ClassifierController(IClassifierService classifierService)
        {
            _classifierService = classifierService;
        }

        [HttpGet("Classifier")]
        public async Task<ActionResult> GetClassifier()
        {
            var getClassifiers = await _classifierService.GetClassifiers();
            if (getClassifiers == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No Classifiers in database");
            }

            return StatusCode(StatusCodes.Status200OK, getClassifiers);
        }

        [HttpGet("Classifier/{id}")]
        public async Task<ActionResult> GetClassifier(Guid id)
        {
            var classifier = await _classifierService.GetClassifier(id);

            if (classifier == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, $"No GeoObject found for id: {id}");
            }

            return StatusCode(StatusCodes.Status200OK, classifier);
        }

        [HttpPost("Classifier")]
        public async Task<ActionResult<ClassifierDTO>> PostClassifier(ClassifierDTO classifierDTO)
        {
            try{
            var dbClassifier = await _classifierService.AddClassifier(classifierDTO);
            if (dbClassifier == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"{classifierDTO.Name} could not be added.");
            }
            return CreatedAtAction("GetClassifier", new {id = classifierDTO.Id}, new {classifierDTO});
            }
            catch(Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"{classifierDTO.Name} could not be added.");
            }
        }
    }
}
