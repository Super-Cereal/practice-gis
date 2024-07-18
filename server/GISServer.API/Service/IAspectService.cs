﻿using GISServer.API.Model;
using GISServer.Domain.Model;

namespace GISServer.API.Service
{
    public interface IAspectService
    {
        public AspectDTO CreateGuid(AspectDTO aspectDTO);
        public Task<AspectDTO> AddAspect(AspectDTO AspectDTO);
        public Task<AspectDTO> GetAspect(Guid id);
        public Task<List<AspectDTO>> GetAspects();
        public Task<List<AspectDTO>> GetGeoObjectAspects(Guid geoObjectId);
        public String CallAspect(String endPoint);
    }
}