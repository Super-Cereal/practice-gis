

using System.Text.Json.Serialization;

namespace GISServer.API.Model
{
    public class PolygonOpDTO : JsonFeatureCollectionWrap<PolygonOpDTO>
    {
        [JsonPropertyName("FeatureCollection")]
        public GeoJSON.Net.Feature.FeatureCollection FeatureCollection { get; set; } = default!;
    }
}
