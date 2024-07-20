using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ParentChildController : ControllerBase
    {

        private readonly IParentChildService _parentChildService;

        public ParentChildController(IGeoObjectService service, IParentChildService parentChildService)
        {
            _parentChildService = parentChildService;
        }

        [HttpGet("GetParentChildLinks")]
        public async Task<ActionResult> GetParentChildLinks()
        {
            var dbParentChildLinks = await _parentChildService.GetParentChildLinks();
            if (dbParentChildLinks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No ParentChildLinks in database.");
            }

            return StatusCode(StatusCodes.Status200OK, dbParentChildLinks);
        }

        [HttpPost("AddParentChildLink")]
        public async Task<ActionResult> PostParentChildLinks(ParentChildObjectLinkDTO parentChildLinkDTO)
        {
            Guid guid = Guid.NewGuid();
            parentChildLinkDTO.Id = guid;

            var dbParentChildLink = await _parentChildService.AddParentChildLink(parentChildLinkDTO);

            if (dbParentChildLink == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
            }

            return CreatedAtAction("GetParentChildLinks", new { parentChildLinkDTO });
        }
    }
}
