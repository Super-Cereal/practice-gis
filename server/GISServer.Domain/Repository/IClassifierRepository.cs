<<<<<<< HEAD
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GISServer.Domain.Repository
{
    internal class IClassifierRepository
    {
=======
﻿namespace GISServer.Domain.Model
{
    public interface IClassifierRepository
    {
        public Task<Classifier> AddClassifier(Classifier classifier);
        public Task<Classifier> GetClassifier(Guid? id);
        public Task<List<Classifier>> GetClassifiers();
>>>>>>> f7ad924ea7ca3b79b54bc3c12d8cad91a905e317
    }
}
