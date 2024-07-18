namespace GISServer.Domain.Model
{
    public interface ITopologyRepository
    {
        public Task<TopologyLink> AddTopologyLink(TopologyLink topologyLink);
        public Task<List<TopologyLink>> GetTopologyLinks();

        // Данный метод реализован, но не используется в TopologyService
        // и вряд ли будет использоваться
        public Task<TopologyLink> GetTopologyLink(Guid? id);
    }
}
