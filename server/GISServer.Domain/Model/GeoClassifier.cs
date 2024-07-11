
namespace GISServer.Domain.Model
{
    public class GeoClassifier
    {
        public Guid Id { get; set; }
        public String? Name { get; set; }
        public int? Code { get; set; }
        public String? CommonInfo { get; set; }
        public List<GeoObjectsGeoClassifiers> GeoObjectsGeoClassifiers { get; set; } = new List<GeoObjectsGeoClassifiers>();

    }
}
