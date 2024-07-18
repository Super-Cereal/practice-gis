using Microsoft.AspNetCore.Mvc;
using GISServer.API.Service;
using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TopologyController : ControllerBase
    {
        private readonly ITopologyService _topologyService;

        public TopologyController(ITopologyService topologyService)
        {
            _topologyService = topologyService;
        }
        
        [HttpGet("TopologyLink")]
        public async Task<ActionResult> GetTopologyLinks()
        {
            var dbTopologyLinks = await _topologyService.GetTopologyLinks();
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

            var dbTopologyLink = await _topologyService.AddTopologyLink(topologyLinkDTO);

            if (dbTopologyLink == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "The relationship could not be added.");
            }

            return CreatedAtAction("GetTopologyLinks", new { topologyLinkDTO });
        }
    }
}
