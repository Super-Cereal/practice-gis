using GISServer.API.Model;
using GISServer.Domain.Model;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GISServer.API.Service
{
    public interface IGeoObjectService
    {
        
        public GeoObjectDTO InitGeoObject(GeoObjectDTO geoObjectDTO);
        public Task<List<GeoObjectDTO>> GetGeoObjects();
        public Task<GeoObjectDTO> GetGeoObject(Guid id);
        public Task<GeoObjectDTO> UpdateGeoObject(GeoObjectDTO geoObjectDTO);
        public Task<GeoObjectDTO> AddGeoObject(GeoObjectDTO geoObjectDTO);
        public Task<(bool, string)> DeleteGeoObject(Guid id);

        public Task<GeoObjectsClassifiersDTO> AddGeoObjectsClassifiers(GeoObjectsClassifiersDTO geoObjectsClassifiersDTO);
        public Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers(Guid? geoObjectInfoId);

        public Task<GeoObjectDTO> AddGeoObjectAspect(Guid geoObjectId, Guid aspectId);
        public Task<List<AspectDTO>> GetGeoObjectAspects(Guid geoObjectId);


        public Task<Feature> UnionPolygons(FeatureCollection featureCollection);
        public Task<Feature> IntersectPolygons(FeatureCollection featureCollection);

    }
}
