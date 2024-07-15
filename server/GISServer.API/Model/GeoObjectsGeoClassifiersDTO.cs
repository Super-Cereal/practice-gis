using GISServer.Domain.Model;

namespace GISServer.API.Model
{
    public class GeoObjectsGeoClassifiersDTO
    {
        public GeoClassifier? GeoClassifier { get; set; }
        public GeoObjectInfo? GeoObjectInfo { get; set; }
        public Guid? GeoObjectId { get; set; }
        public Guid? GeoClassifierId { get; set; }
    }
}
