using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IGeoObjectClassifierService
    {
        public Task<GeoObjectsGeoClassifiersDTO> AddGeoObjectsGeoClassifiers(GeoObjectsGeoClassifiersDTO geoObjectsGeoClassifiersDTO);
        public Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers(Guid? geoObjectInfoId);
        public Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers();
    }
}
