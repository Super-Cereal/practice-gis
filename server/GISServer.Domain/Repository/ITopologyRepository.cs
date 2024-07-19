<<<<<<< HEAD
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GISServer.Domain.Repository
{
    internal class ITopologyRepository
    {
=======
﻿namespace GISServer.Domain.Model
{
    public interface ITopologyRepository
    {
        public Task<TopologyLink> AddTopologyLink(TopologyLink topologyLink);
        public Task<List<TopologyLink>> GetTopologyLinks();

        // Данный метод реализован, но не используется в TopologyService
        // и вряд ли будет использоваться
        public Task<TopologyLink> GetTopologyLink(Guid? id);
>>>>>>> f7ad924ea7ca3b79b54bc3c12d8cad91a905e317
    }
}
