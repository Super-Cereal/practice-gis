<<<<<<< HEAD
﻿using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Repository
{
    public class TopologyRepository
    {
=======
using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Service
{
    public class TopologyRepository : ITopologyRepository
    {
        private readonly Context _context;

        public TopologyRepository(Context context)
        {
            _context = context;
        }

        // TopologyRepository
        public async Task<TopologyLink> GetTopologyLink(Guid? id)
        {
            try
            {
                return await _context.TopologyLinks
                    .Where(tl => tl.Id == id)
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        // TopologyRepository
        public async Task<List<TopologyLink>> GetTopologyLinks()
        {
            try
            {
                return await _context.TopologyLinks
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        // TopologyRepository
        public async Task<TopologyLink> AddTopologyLink(TopologyLink topologyLink)
        {

            await _context.TopologyLinks.AddAsync(topologyLink);
            await _context.SaveChangesAsync();
            return await GetTopologyLink(topologyLink.Id);
        }

>>>>>>> f7ad924ea7ca3b79b54bc3c12d8cad91a905e317
    }
}
