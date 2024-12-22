using GeoJSON.Net.Geometry;
using GISServer.API.Mapper;
using System.Text.Json.Serialization;

namespace GISServer.API.Model
{
    public class PolygonOpDTO
    {
        [JsonConverter(typeof(PolygonConverter))]  // Применяем кастомный конвертер
        public Polygon Polygon1 { get; set; }

        [JsonConverter(typeof(PolygonConverter))]  
        public Polygon Polygon2 { get; set; }
    }
}
