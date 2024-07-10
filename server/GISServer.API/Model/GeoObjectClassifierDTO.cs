namespace GISServer.API.Model
{
    public class GeoObjectClassifierDTO
    {
        public Guid Id { get; set; }
        public String? Name { get; set; }
        public int? Code { get; set; }
        public String? CommonInfo { get; set; }
    }
}