using GISServer.Domain.Model;

namespace GISServer.API.Model
{
    public class GeoObjectsGeoClassifiersDTO
    {
        public GeoClassifier? GeoClassifier { get; set; }
        public GeoObject? GeoObject { get; set; }
        public Guid? GeoObjectId { get; set; }
        public Guid? GeoClassifierId { get; set; }
    }
}
