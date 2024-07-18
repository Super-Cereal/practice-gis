using GISServer.API.Model;
using GISServer.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using GISServer.API.Mapper;


namespace GISServer.API.Service
{
    public class GeoObjectClassifierService : IGeoObjectClassifierService
    {
        private readonly IGeoObjectRepository _repository;

        public GeoObjectClassifierService(IGeoObjectRepository repository)
        {
            _repository = repository;
        }

        public async Task<GeoObjectsGeoClassifiersDTO> AddGeoObjectsGeoClassifiers(GeoObjectsGeoClassifiersDTO geoObjectsGeoClassifiersDTO)
        {
            try
            {
                var geoObjectClassifiers = new GeoObjectsGeoClassifiers
                {
                    GeoObjectId = geoObjectsGeoClassifiersDTO.GeoObjectId,
                    GeoClassifierId = geoObjectsGeoClassifiersDTO.GeoClassifierId
                };

                await _repository.AddGeoObjectsGeoClassifiers(geoObjectClassifiers);

                return geoObjectsGeoClassifiersDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }

        public async Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers(Guid? geoObjectInfoId)
        {
            try
            {
                return await _repository.GetGeoObjectsGeoClassifiers(geoObjectInfoId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }

        public async Task<List<GeoObjectsGeoClassifiers>> GetGeoObjectsGeoClassifiers()
        {
            try
            {
                return await _repository.GetGeoObjectsGeoClassifiers();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }
    }
}
