using GISServer.API.Model;
using GISServer.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using GISServer.API.Mapper;


namespace GISServer.API.Service
{
    public class TopologyService : ITopologyService 
    {
        private readonly ITopologyRepository _repository;
        private readonly TopologyMapper _topologyMapper;

        public TopologyService(ITopologyRepository repository, TopologyMapper topologyMapper)
        {
            _repository = repository;
            _topologyMapper = topologyMapper;
        }

        public TopologyLinkDTO CreateGuid(TopologyLinkDTO topologyLinkDTO)
        {
            topologyLinkDTO.Id = Guid.NewGuid();
            return topologyLinkDTO;
        }


        public async Task<TopologyLinkDTO> AddTopologyLink(TopologyLinkDTO topologyLinkDTO)
        {
            try
            {
                TopologyLink topologyLink = await _topologyMapper.DTOToTopologyLink(topologyLinkDTO);
                return await _topologyMapper.TopologyLinkToDTO(await _repository.AddTopologyLink(topologyLink));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }

        public async Task<List<TopologyLinkDTO>> GetTopologyLinks()
        {
            try
            {
                List<TopologyLinkDTO> topologyLinksDTO = new List<TopologyLinkDTO>();
                List<TopologyLink> topologyLinks = await _repository.GetTopologyLinks();
                foreach (var topologyLink in topologyLinks)
                {
                    topologyLinksDTO.Add(await _topologyMapper.TopologyLinkToDTO(topologyLink));
                }
                return topologyLinksDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }
    }
}
