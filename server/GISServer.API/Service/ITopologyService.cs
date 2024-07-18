using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface ITopologyService
    {
        public TopologyLinkDTO CreateGuid(TopologyLinkDTO topologyLinkDTO);
        public Task<TopologyLinkDTO> AddTopologyLink(TopologyLinkDTO topologyLinkDTO);
        public Task<List<TopologyLinkDTO>> GetTopologyLinks();
    }
}
