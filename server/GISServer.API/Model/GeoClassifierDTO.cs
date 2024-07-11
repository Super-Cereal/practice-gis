namespace GISServer.API.Model
{
    public class GeoClassifierDTO
    {
        public Guid Id { get; set; }
        public String? Name { get; set; }
        public int? Code { get; set; }
        public String? CommonInfo { get; set; }
        public List<GeoObjectsGeoClassifiersDTO> GeoObjectsGeoClassifiers { get; set; } = new List<GeoObjectsGeoClassifiersDTO>();
    }
}