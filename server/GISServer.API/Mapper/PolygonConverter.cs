using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using GeoJSON.Net.Geometry;

public class PolygonConverter : JsonConverter<Polygon>
{
    public override Polygon Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        try
        {
            Console.WriteLine("Starting deserialization in PolygonConverter...");

            // Десериализация JSON как объекта с единственным полем "coordinates"
            var jsonObject = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(ref reader);

            Console.WriteLine("Raw JSON data deserializing: " + JsonSerializer.Serialize(jsonObject));

            if (jsonObject.TryGetValue("coordinates", out var coordinatesElement))
            {
                // Парсим массив координат
                var coordinates = coordinatesElement.EnumerateArray()
                    .Select(line => line.EnumerateArray()
                        .Select(p => new Position(p[1].GetDouble(), p[0].GetDouble(), p.GetArrayLength() > 2 ? p[2].GetDouble() : 0)) // Широта, долгота, высота (если есть)
                        .ToList())
                    .ToList();

                // Логируем результат
                Console.WriteLine("Parsed coordinates: " + JsonSerializer.Serialize(coordinates));

                // Создаем список LineString из координат
                var lineStrings = coordinates.Select(coord => new LineString(coord)).ToList();

                Console.WriteLine("lineStrings: " + JsonSerializer.Serialize(lineStrings));
                return new Polygon(lineStrings);  // Возвращаем объект Polygon
            }

            throw new JsonException("Missing 'coordinates' property in Polygon JSON.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error during Polygon deserialization: " + ex);
            throw;
        }
    }

    public override void Write(Utf8JsonWriter writer, Polygon value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WritePropertyName("coordinates");

        writer.WriteStartArray();
        foreach (var line in value.Coordinates)
        {
            writer.WriteStartArray();
            foreach (var position in line.Coordinates)
            {
                writer.WriteStartArray();
                writer.WriteNumberValue(position.Longitude);
                writer.WriteNumberValue(position.Latitude);
                if (position.Altitude.HasValue)
                {
                    writer.WriteNumberValue(position.Altitude.Value);
                }
                writer.WriteEndArray();
            }
            writer.WriteEndArray();
        }
        writer.WriteEndArray();

        writer.WriteEndObject();
    }
}
