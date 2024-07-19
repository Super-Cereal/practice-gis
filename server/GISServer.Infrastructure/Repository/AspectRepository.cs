<<<<<<< HEAD
﻿using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Repository
{
    public class AspectRepository : IAspectRepository
    {
=======
using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Service
{
    public class AspectRepository : IAspectRepository
    {
        private readonly Context _context;

        public AspectRepository(Context context)
        {
            _context = context;
        }

        // AspectRepository
        public async Task<Aspect> GetAspect(Guid? id)
        {
            return await _context.Aspects
                .Where(a => a.Id == id)
                .FirstOrDefaultAsync();
        }

        // AspectRepository
        public async Task<List<Aspect>> GetAspects()
        {
            return await _context.Aspects
                .ToListAsync();
        }

        // AspectRepository
        public async Task<Aspect> AddAspect(Aspect aspect)
        {
            await _context.AddAsync(aspect);
            await _context.SaveChangesAsync();
            return await GetAspect(aspect.Id);
        }

>>>>>>> f7ad924ea7ca3b79b54bc3c12d8cad91a905e317
    }
}
