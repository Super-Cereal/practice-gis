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

        public Task<Classifier> AddClassifier(Classifier classifier);
        public Task<Classifier> GetClassifier(Guid? id);
        public Task<List<Classifier>> GetClassifiers();

        public Task<List<GeoObjectsClassifiers>> AddGeoObjectsClassifiers (GeoObjectsClassifiers geoObjectsClassifiers);
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers(Guid? geoObjectInfoId);
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers();

        public Task<TopologyLink> AddTopologyLink(TopologyLink topologyLink);
        public Task<List<TopologyLink>> GetTopologyLinks();

        public Task<Aspect> AddAspect(Aspect aspect);
        public Task<Aspect> GetAspect(Guid? id);
        public Task<List<Aspect>> GetAspects();
        public Task<GeoObject> AddGeoObjectAspect(Guid geoObjectId, Guid aspectId);
        public Task<List<Aspect>> GetGeoObjectAspects(Guid geoObjectId);
    }
}
