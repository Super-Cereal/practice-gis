using GISServer.API.Model;
using GISServer.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using GISServer.API.Mapper;


namespace GISServer.API.Service
{
    public class GeoObjectClassifiersService : IGeoObjectClassifiersService
    {
        private readonly IGeoObjectsClassifiersRepository _repository;

        public GeoObjectClassifiersService(IGeoObjectsClassifiersRepository repository)
        {
            _repository = repository;
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
