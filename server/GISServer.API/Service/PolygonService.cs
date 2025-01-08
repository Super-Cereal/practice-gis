using Clipper2Lib;
using GeoJSON.Net;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;


namespace GISServer.API.Service
{

    public class PolygonService
    {
        private const int MinimumOfInputObjects = 2;

        /// <summary>
        /// Объеденяет несколько полигонов в 1
        /// </summary>
        /// <param name="featureCollection">Коллекция фишек</param>
        /// <returns></returns>
        public Feature Union(FeatureCollection featureCollection)
        {
            var pathsCollection = ConvertToPathsCollection(featureCollection);

            var previous = UnionPolygons(pathsCollection);

            return ConvertToGeoJSON(previous);
        }

        public Feature Intersection(FeatureCollection featureCollection)
        {
            var pathsCollection = ConvertToPathsCollection(featureCollection);

            var previous = IntersectPolygons(pathsCollection);

            return ConvertToGeoJSON(previous);

        }

        private static Feature ConvertToGeoJSON(PathsD previous)
        {
            var lineList = new List<LineString>();

            foreach (var path in previous)
            {
                var positionList = new List<Position>();

                positionList.AddRange(path.Select(point => new Position(point.x, point.y)));

                // Добавляем первую точку в конец для замыкания полигона (требуется в geoJSON)
                var firstPoint = path.First();
                positionList.Add(new Position(firstPoint.x, firstPoint.y));

                var line = new LineString(positionList);
                lineList.Add(line);
            }

            var resultPolygon = new Polygon(lineList);

            return new Feature(resultPolygon);
        }

        private static PathsD UnionPolygons(List<PathsD> pathsCollection)
        {
            var previous = pathsCollection.First();

            for (var i = 1; i < pathsCollection.Count; i++)
            {
                var next = pathsCollection[i];
                previous = Clipper.Union(previous, next, FillRule.NonZero);
            }

            return previous;
        }

        private static PathsD IntersectPolygons(List<PathsD> pathsCollection)
        {
            var previous = pathsCollection.First();

            for (var i = 1; i < pathsCollection.Count; i++)
            {
                var next = pathsCollection[i];
                previous = Clipper.Intersect(previous, next, FillRule.NonZero);
            }

            return previous;
        }

        private static List<PathsD> ConvertToPathsCollection(FeatureCollection featureCollection)
        {
            if (featureCollection.Type != GeoJSONObjectType.FeatureCollection)
            {
                throw new($"Feature type is not a FeatureCollection");
            }

            if (featureCollection.Features is null ||
              featureCollection.Features.Count < MinimumOfInputObjects)
            {
                throw new($"Features count must be greater or equal of {MinimumOfInputObjects}");
            }

            var pathsCollection = new List<PathsD>();

            foreach (var feature in featureCollection.Features)
            {
                var geometry = feature.Geometry;
                if (geometry is null)
                {
                    throw new("Geometry is null");
                }
                if (geometry.Type != GeoJSONObjectType.Polygon)
                {
                    throw new($"Geometry type is not a Polygon");
                }

                if (geometry is not Polygon polygon)
                {
                    throw new($"Geometry type is not a Polygon");
                }

                var lines = polygon.Coordinates;
                if (lines is null)
                {
                    throw new("Lines is null");
                }
                if (lines.Count != 1)
                {
                    throw new($"Lines count must be 1");
                }

                var line = lines.First();

                var points = line.Coordinates
                  .Where(position => position != line.Coordinates.Last())
                  .Select(position => new PointD(position.Latitude, position.Longitude));

                var paths = new PathsD(new List<PathD> { new PathD(points) });


                pathsCollection.Add(paths);
            }

            return pathsCollection;
        }
    }
}

