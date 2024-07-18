using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Service
{
    public class GeoObjectsClassifiersRepository : IGeoObjectsClassifiersRepository
    {
        private readonly Context _context;

        public GeoObjectsClassifiersRepository(Context context)
        {
            _context = context;
        }

        // GeoObjectsCLassifiersRepository
        public async Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers()
        {
            return await _context.GeoObjectsClassifiers
                .Include(gogc => gogc.GeoObjectInfo)
                .Include(gogc => gogc.Classifier)
                .ToListAsync();
        }

    }
}
