﻿using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IGeoObjectClassifiersService
    {
        public Task<List<GeoObjectsClassifiersDTO>> GetGeoObjectsClassifiers();
        public Task<(bool, string)> DeleteGeoObjectClassifier(Guid geoObjectId, Guid classifierId);
    }
}
