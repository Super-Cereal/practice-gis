using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IGeoObjectClassifiersService
    {
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers(Guid? geoObjectInfoId);
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers();
    }
}
