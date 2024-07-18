using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IClassifierService
    {
        public GeoClassifierDTO CreateGuid(GeoClassifierDTO classifierDTO);
        public Task<GeoClassifierDTO> AddGeoClassifier(GeoClassifierDTO geoClassifierDTO);
        public Task<GeoClassifierDTO> GetGeoClassifier(Guid id);
        public Task<List<GeoClassifierDTO>> GetGeoClassifiers();
    }
}
