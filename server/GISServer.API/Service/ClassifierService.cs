using GISServer.API.Model;
using GISServer.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using GISServer.API.Mapper;


namespace GISServer.API.Service
{
    public class ClassifierService : IClassifierService
    {
        private readonly IGeoObjectRepository _repository;
        private readonly ClassifierMapper _classifierMapper;

        public ClassifierService(IGeoObjectRepository repository, ClassifierMapper classifierMapper)
        {
            _repository = repository;
            _classifierMapper = classifierMapper;
        }

        public GeoClassifierDTO CreateGuid(GeoClassifierDTO classifierDTO)
        {
            classifierDTO.Id = Guid.NewGuid();
            return classifierDTO;
        }

        public async Task<GeoClassifierDTO> AddGeoClassifier(GeoClassifierDTO geoClassifierDTO)
        {
            try
            {
                GeoClassifier geoClassifier = await _classifierMapper.DTOToClassifier(geoClassifierDTO);
                return await _classifierMapper.ClassifierToDTO(await _repository.AddGeoClassifier(geoClassifier));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex. Message}");
                return null;
            }
        }
        
        public async Task<GeoClassifierDTO> GetGeoClassifier(Guid id)
        {
            try
            {
                GeoClassifierDTO geoClassifierDTO = await _classifierMapper.ClassifierToDTO(await _repository.GetGeoClassifier(id));
                return geoClassifierDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<GeoClassifierDTO>> GetGeoClassifiers()
        {
            try
            {
                List<GeoClassifier> geoClassifiersFromDB = new List<GeoClassifier>(await _repository.GetGeoClassifiers());
                List<GeoClassifierDTO> geoClassifiers = new List<GeoClassifierDTO>();
                foreach (var geoClassifier in geoClassifiersFromDB)
                {
                    geoClassifiers.Add(await _classifierMapper.ClassifierToDTO(geoClassifier));
                }
                return geoClassifiers;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
