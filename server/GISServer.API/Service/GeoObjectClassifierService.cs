using GISServer.API.Model;
using GISServer.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using GISServer.API.Mapper;


namespace GISServer.API.Service
{
    public class GeoObjectClassifiersService : IGeoObjectClassifiersService
    {
        private readonly IGeoObjectRepository _repository;

        public GeoObjectClassifiersService(IGeoObjectRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers(Guid? geoObjectInfoId)
        {
            try
            {
                return await _repository.GetGeoObjectsClassifiers(geoObjectInfoId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }

        public async Task<List<GeoObjectsClassifiers>> GetGeoObjectsClassifiers()
        {
            try
            {
                return await _repository.GetGeoObjectsClassifiers();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }
    }
}
