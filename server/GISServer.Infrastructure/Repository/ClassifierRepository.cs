<<<<<<< HEAD
﻿using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Repository
{
    public class ClassifierRepository
    {
=======
using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Service
{
    public class ClassifierRepository : IClassifierRepository
    {
        private readonly Context _context;

        public ClassifierRepository(Context context)
        {
            _context = context;
        }

        // ClassifierRepository
        public async Task<List<Classifier>> GetClassifiers()
        {
            return await _context.Classifiers
                .ToListAsync();
        }

        // ClassifierRepository
        public async Task<Classifier> GetClassifier(Guid? id)
        {
            try{
            return await _context.Classifiers
                .Where(ci => ci.Id == id)
                .FirstOrDefaultAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                return null;
            }
        }

        // ClassifierRepository
        public async Task<Classifier> AddClassifier(Classifier classifier)
        {
            await _context.Classifiers.AddAsync(classifier);
            await _context.SaveChangesAsync();
            return await GetClassifier(classifier.Id);
        }
<<<<<<< HEAD
        public async Task<(bool, string)> DeleteClassifier(Guid id)
        {
=======
>>>>>>> f7ad924ea7ca3b79b54bc3c12d8cad91a905e317
>>>>>>> 4f71d6e34d285074f65b8b1bbb82d74fc4315c5f

            var dbClassifier = await GetClassifier(id);
            if (dbClassifier == null)
            {
                return (false, "GeoObeject could not be found");
            }
            _context.Classifiers.Remove(dbClassifier);
            await _context.SaveChangesAsync();
            return (true, "Classifier got deleted");
        }
    }
}
