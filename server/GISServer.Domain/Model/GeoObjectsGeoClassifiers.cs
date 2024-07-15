using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GISServer.Domain.Model
{
    public class GeoObjectsGeoClassifiers
    {
        public GeoClassifier? GeoClassifier { get; set; }
        public GeoObjectInfo? GeoObjectInfo { get; set; }
        public Guid? GeoObjectId { get; set; }
        public Guid? GeoClassifierId { get; set; }
    }
}
 