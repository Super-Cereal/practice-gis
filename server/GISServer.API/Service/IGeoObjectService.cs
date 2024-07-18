using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IGeoObjectService
    {
        public GeoObjectDTO CreateGuids(GeoObjectDTO geoObjectDTO);
        public Task<List<GeoObjectDTO>> GetGeoObjects();
        public Task<GeoObjectDTO> GetGeoObject(Guid id);
        public Task<GeoObjectDTO> UpdateGeoObject(GeoObjectDTO geoObjectDTO);
        public Task<GeoObjectDTO> AddGeoObject(GeoObjectDTO geoObjectDTO);
        public Task<(bool, string)> DeleteGeoObject(Guid id);
        
        public Task<GeoClassifierDTO> AddGeoClassifier(GeoClassifierDTO geoClassifierDTO);
        public Task<GeoClassifierDTO> GetGeoClassifier(Guid id);
        public Task<List<GeoClassifierDTO>> GetGeoClassifiers();
        public Task<GeoObjectsGeoClassifiersDTO> AddGeoObjectsGeoClassifiers(GeoObjectsGeoClassifiersDTO geoObjectsGeoClassifiersDTO);
        public Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers(Guid? geoObjectInfoId);
        public Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers();

        public Task<TopologyLinkDTO> AddTopologyLink(TopologyLinkDTO topologyLinkDTO);
        public Task<List<TopologyLinkDTO>> GetTopologyLinks();

        public Task<AspectDTO> AddAspect(AspectDTO AspectDTO);
        public Task<AspectDTO> GetAspect(Guid id);
        public Task<List<AspectDTO>> GetAspects();
        public Task<GeoObjectDTO> AddGeoObjectAspect(Guid geoObjectId, Guid aspectId);
        public Task<List<AspectDTO>> GetGeoObjectAspects(Guid geoObjectId);
        public String CallAspect(String endPoint);
    }
}
