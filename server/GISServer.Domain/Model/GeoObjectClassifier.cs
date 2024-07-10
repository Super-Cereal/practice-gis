
namespace GISServer.Domain.Model
{
    public class GeoObjectClassifier
    {
        public Guid Id { get; set; }
        public String? Name { get; set; }
        public int? Code { get; set; }
        public String? CommonInfo { get; set; }
    }
}
