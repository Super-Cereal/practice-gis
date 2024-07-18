using GISServer.Domain.Model;

namespace GISServer.API.Model
{
    public class GeoObjectsClassifiersDTO
    {
        public Classifier? Classifier { get; set; }
        public GeoObjectInfo? GeoObjectInfo { get; set; }
        public Guid? GeoObjectId { get; set; }
        public Guid? ClassifierId { get; set; }
    }
}
