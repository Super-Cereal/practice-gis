﻿using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IGeoObjectService
    {
        public GeoObjectDTO CreateGuids(GeoObjectDTO geoObjectDTO);
        public Task<List<GeoObjectDTO>> GetGeoObjects();
        public Task<GeoObjectDTO> GetGeoObject(Guid id);
        public Task<GeoObjectDTO> UpdateGeoObject(GeoObjectDTO geoObjectDTO);
        public Task<GeoObjectDTO> AddGeoObject(GeoObjectDTO geoObjectDTO);
        public Task<(bool, string)> DeleteGeoObject(Guid id);   

        public Task<GeoObjectDTO> AddGeoObjectAspect(Guid geoObjectId, Guid aspectId);
        public Task<List<AspectDTO>> GetGeoObjectAspects(Guid geoObjectId);
    }
}
