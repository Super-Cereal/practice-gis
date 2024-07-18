using GISServer.API.Model;
using GISServer.Domain.Model;
using NetTopologySuite.Geometries;


namespace GISServer.API.Mapper
{
    public class ClassifierMapper
    {
     
        public async Task<GeoClassifier> DTOToClassifier(GeoClassifierDTO geoClassifierDTO)
        {
            GeoClassifier geoClassifier = new GeoClassifier();
            geoClassifier.Id = geoClassifierDTO.Id;
            geoClassifier.Name = geoClassifierDTO.Name;
            geoClassifier.Code = geoClassifierDTO.Code;
            geoClassifier.CommonInfo = geoClassifierDTO.CommonInfo;
            return geoClassifier;
        }

        public async Task<GeoClassifierDTO> ClassifierToDTO(GeoClassifier geoClassifier)
        {
            GeoClassifierDTO geoClassifierDTO = new GeoClassifierDTO();
            geoClassifierDTO.Id = geoClassifier.Id;
            geoClassifierDTO.Name = geoClassifier.Name;
            geoClassifierDTO.Code = geoClassifier.Code;
            geoClassifierDTO.CommonInfo = geoClassifier.CommonInfo;
            return geoClassifierDTO;
        }

       
    }
}
