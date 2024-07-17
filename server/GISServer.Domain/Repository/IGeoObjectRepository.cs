namespace GISServer.Domain.Model
{
    public interface IGeoObjectRepository
    {
        public Task<List<GeoObject>> GetGeoObjects();
        public Task<GeoObject> GetGeoObject(Guid id);
        public Task<GeoObject> UpdateGeoObject(GeoObject geoObject);
        public Task<GeoObject> AddGeoObject(GeoObject geoObject);
        public Task<(bool, string)> DeleteGeoObject(Guid id);
        public Task UpdateAsync(GeoObject geoObject);
        public Task<GeoObject> GetByNameAsync(string name);
        public Task<GeoClassifier> AddGeoClassifier(GeoClassifier geoClassifier);
        public Task<GeoClassifier> GetGeoClassifier(Guid? id);
        public Task<List<GeoClassifier>> GetGeoClassifiers();
        public Task<List<GeoObjectsGeoClassifiers>> AddGeoObjectsGeoClassifiers (GeoObjectsGeoClassifiers geoObjectsGeoClassifiers);
        public Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers(Guid? geoObjectInfoId);
        public Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers();

        public Task<TopologyLink> AddTopologyLink(TopologyLink topologyLink);
        public Task<List<TopologyLink>> GetTopologyLinks();

        public Task<Aspect> AddAspect(Aspect aspect);
        public Task<Aspect> GetAspect(Guid? id);
        public Task<List<Aspect>> GetAspects();
        public Task<GeoObject> AddGeoObjectAspect(Guid geoObjectId, Guid aspectId);
        public Task<List<Aspect>> GetGeoObjectAspects(Guid geoObjectId);
    }
}
