namespace GISServer.API.Model
{
    public class PolygonDTO
    {
        public string Type { get; set; }
        public List<List<List<double>>> Coordinates { get; set; }
    }

}
