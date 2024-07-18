using GISServer.API.Model;
using GISServer.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace GISServer.API.Service
{
    public class GeoObjectService : IGeoObjectService
    {
        private readonly IGeoObjectRepository _repository;
        private readonly GeoObjectMapper _geoObjectMapper;
        private readonly AspectMapper _aspectMapper;
        private readonly ClassifierMapper _classifierMapper;

        public GeoObjectService(IGeoObjectRepository repository, GeoObjectMapper geoObjectMapper)
        {
            _repository = repository;
            _geoObjectMapper = geoObjectMapper;
        }

        public async Task<List<GeoObjectDTO>> GetGeoObjects()
        {
            try
            {
                List<GeoObject> geoObjectsFromDB = new List<GeoObject>(await _repository.GetGeoObjects());
                List<GeoObjectDTO> geoObjects = new List<GeoObjectDTO>();
                foreach (var geoObject in geoObjectsFromDB)
                {
                    List<GeoObjectsGeoClassifiers> geoObjectsGeoClassifiersFromDB = new List<GeoObjectsGeoClassifiers>(await _repository.GetGeoObjectsGeoClassifiers(geoObject.Id));
                    foreach (var gogc in geoObjectsGeoClassifiersFromDB)
                    {
                        geoObject.GeoObjectInfo.GeoClassifiers.Add(await _repository.GetGeoClassifier(gogc.GeoClassifierId));

                    }
                
                    geoObjects.Add(await _geoObjectMapper.ObjectToDTO(geoObject));
                }
                return geoObjects;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<GeoObjectDTO> GetGeoObject(Guid id)
        {
            try
            {
                GeoObjectDTO geoObject = await _geoObjectMapper.ObjectToDTO(await _repository.GetGeoObject(id));
                
                List<GeoObjectsGeoClassifiers> geoObjectsGeoClassifiersFromDB = new List<GeoObjectsGeoClassifiers>(
                        await _repository.GetGeoObjectsGeoClassifiers(id));

                foreach (var gogc in geoObjectsGeoClassifiersFromDB)
                {
                   geoObject.GeoObjectInfo.GeoClassifiers.Add(
                       await _geoObjectMapper.ClassifierToDTO(
                           await _repository.GetGeoClassifier(gogc.GeoClassifierId)));

                }

                return geoObject;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<GeoObjectDTO> AddGeoObject(GeoObjectDTO geoObjectDTO)
        {
            try
            {
                GeoObject geoObject = await _geoObjectMapper.DTOToObject(geoObjectDTO);
                return await _geoObjectMapper.ObjectToDTO(await _repository.AddGeoObject(geoObject));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }


        public async Task<GeoObjectDTO> UpdateGeoObject(GeoObjectDTO geoObjectDTO)
        {
            try
            {
                GeoObject geoObject = await _geoObjectMapper.DTOToObject(geoObjectDTO);
                await _repository.UpdateGeoObject(geoObject);
                return geoObjectDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<(bool, string)> DeleteGeoObject(Guid id)
        {
            try
            {
                return await _repository.DeleteGeoObject(id);
            }
            catch (Exception ex)
            {
                return (false, $"An error occured. Error Message: {ex.Message}");
            }
        }

        public async Task<GeoObjectsGeoClassifiersDTO> AddGeoObjectsGeoClassifiers(GeoObjectsGeoClassifiersDTO geoObjectsGeoClassifiersDTO)
        {
            try
            {
                // Создаем объект сущности из DTO
                var entity = new GeoObjectsGeoClassifiers
                {
                    GeoObjectId = geoObjectsGeoClassifiersDTO.GeoObjectId,
                    GeoClassifierId = geoObjectsGeoClassifiersDTO.GeoClassifierId
                };

                // Добавляем объект в репозиторий и сохраняем изменения
                await _repository.AddGeoObjectsGeoClassifiers(entity);

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
        public GeoObjectDTO CreateGuids(GeoObjectDTO geoObjectDTO)
        {
            Guid guid = Guid.NewGuid();
            geoObjectDTO.Id = guid;
            geoObjectDTO.GeoObjectInfo.Id = guid;
            geoObjectDTO.Geometry.Id = guid;

            return geoObjectDTO;
        }


       
       
        public async Task<GeoObjectDTO> AddGeoObjectAspect(Guid geoObjectId, Guid aspectId)
        {
            try
            {
                return await _geoObjectMapper.ObjectToDTO(
                    await _repository.AddGeoObjectAspect(geoObjectId, aspectId)
                    );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured. Error Message: {ex.Message}");
                return null;
            }
        }

        public async Task<List<AspectDTO>> GetGeoObjectAspects(Guid geoObjectId)
        {
            try
            {
                List<AspectDTO> aspectsDTO = new List<AspectDTO>();
                List<Aspect> aspects = await _repository.GetGeoObjectAspects(geoObjectId);
                foreach(var aspect in aspects)
                {
                    aspectsDTO.Add(await _geoObjectMapper.AspectToDTO(aspect));
                }
                return aspectsDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
