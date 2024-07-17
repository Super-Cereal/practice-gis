using GISServer.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace GISServer.Infrastructure.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public Context()
        {
        }

        public DbSet<GeoObject> GeoObjects { get; set; }
        public DbSet<GeoClassifier> GeoClassifiers { get; set; }
        public DbSet<GeoNamesFeature> GeoNamesFeatures { get; set; }
        public DbSet<GeometryVersion> GeometryVersions { get; set; }
        public DbSet<GeoObjectInfo> GeoObjectInfos { get; set; }
        public DbSet<ParentChildObjectLink> ParentChildObjectLinks { get; set; }
        public DbSet<TopologyLink> TopologyLinks { get; set; }  
        public DbSet<GeoObjectsGeoClassifiers> GeoObjectsGeoClassifiers { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            if (!builder.IsConfigured)
            {
                builder.UseNpgsql("Host=localhost;Port=5432;Database=gisserver;Username=postgres;Password=root;",
                o => o.UseNetTopologySuite());
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<GeoObject>()
                .HasOne(e => e.GeoNameFeature)
                .WithMany(e => e.GeographicalObject)
                .HasForeignKey(e => e.GeoNameFeatureId);
            modelBuilder
                .Entity<GeoObject>()
                .HasMany(e => e.GeometryVersion)
                .WithOne(e => e.GeographicalObject)
                .HasForeignKey(e => e.GeographicalObjectId);
            modelBuilder
                .Entity<GeoObject>()
                .HasOne(e => e.GeoObjectInfo)
                .WithOne(e => e.GeographicalObject)
                .HasForeignKey<GeoObjectInfo>(e => e.GeographicalObjectId);
            modelBuilder
                .Entity<GeoObject>()
                .HasMany(e => e.ParentGeoObjects)
                .WithOne(e => e.ChildGeographicalObject)
                .HasForeignKey(e => e.ChildGeographicalObjectId);
            modelBuilder
                .Entity<GeoObject>()
                .HasMany(e => e.ChildGeoObjects)
                .WithOne(e => e.ParentGeographicalObject)
                .HasForeignKey(e => e.ParentGeographicalObjectId);
            modelBuilder
                .Entity<GeoObject>()
                .HasMany(e => e.InputTopologyLinks)
                .WithOne(e => e.GeographicalObjectIn)
                .HasForeignKey(e => e.GeographicalObjectInId);
            modelBuilder
                .Entity<GeoObject>()
                .HasMany(e => e.OutputTopologyLinks)
                .WithOne(e => e.GeographicalObjectOut)
                .HasForeignKey(e => e.GeographicalObjectOutId);

            modelBuilder 
                .Entity<GeoObjectsGeoClassifiers>()
                .HasKey(e => new {e.GeoClassifierId, e.GeoObjectId});
            modelBuilder.Entity<GeoObjectsGeoClassifiers>()
                .HasOne<GeoObjectInfo>(e => e.GeoObjectInfo)
                .WithMany(e => e.GeoObjectsGeoClassifiers)
                .HasForeignKey(e => e.GeoObjectId);
            modelBuilder.Entity<GeoObjectsGeoClassifiers>()
                .HasOne<GeoClassifier>(e => e.GeoClassifier)
                .WithMany(e => e.GeoObjectsGeoClassifiers)
                .HasForeignKey(e => e.GeoClassifierId);


        }
    }
}
