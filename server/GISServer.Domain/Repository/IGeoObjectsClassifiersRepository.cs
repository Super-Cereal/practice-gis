namespace GISServer.Domain.Model
{
    public interface IGeoObjectsClassifiersRepository
    {
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers();
    }
}
