using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IGeoObjectClassifierService
    {
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers(Guid? geoObjectInfoId);
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers();
    }
}
