﻿// <auto-generated />
using System;
using GISServer.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace GISServer.Infrastructure.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20240717173011_migr1701C")]
    partial class migr1701C
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "postgis");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("GISServer.Domain.Model.Aspect", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("CommonInfo")
                        .HasColumnType("text");

                    b.Property<string>("EndPoint")
                        .HasColumnType("text");

                    b.Property<Guid?>("GeographicalObjectId")
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GeographicalObjectId");

                    b.ToTable("Aspects");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoClassifier", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("CommonInfo")
                        .HasColumnType("text");

                    b.Property<Guid?>("GeoObjectInfoId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GeoObjectInfoId");

                    b.ToTable("GeoClassifiers");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoNamesFeature", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CommentsEn")
                        .HasColumnType("text");

                    b.Property<string>("CommentsRu")
                        .HasColumnType("text");

                    b.Property<string>("FeatureKindNameEn")
                        .HasColumnType("text");

                    b.Property<string>("FeatureKindNameRu")
                        .HasColumnType("text");

                    b.Property<string>("FeatureNameEn")
                        .HasColumnType("text");

                    b.Property<string>("FeatureNameRu")
                        .HasColumnType("text");

                    b.Property<string>("GeoNamesFeatureCode")
                        .HasColumnType("text");

                    b.Property<string>("GeoNamesFeatureKind")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("GeoNamesFeatures");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObject", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreationTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("GeoNameFeatureId")
                        .HasColumnType("uuid");

                    b.Property<int?>("GeoNameId")
                        .HasColumnType("integer");

                    b.Property<Guid?>("GeometryId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("GeoNameFeatureId");

                    b.HasIndex("GeometryId");

                    b.ToTable("GeoObjects");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObjectInfo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("ArchiveTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("AuthoritativeKnowledgeSource")
                        .HasColumnType("text");

                    b.Property<string>("CommonInfo")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreationTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FullName")
                        .HasColumnType("text");

                    b.Property<Guid?>("GeographicalObjectId")
                        .HasColumnType("uuid");

                    b.Property<string>("Language")
                        .HasColumnType("text");

                    b.Property<string>("LanguageCode")
                        .HasColumnType("text");

                    b.Property<string>("ShortName")
                        .HasColumnType("text");

                    b.Property<int?>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("Version")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GeographicalObjectId")
                        .IsUnique();

                    b.ToTable("GeoObjectInfos");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObjectsGeoClassifiers", b =>
                {
                    b.Property<Guid?>("GeoClassifierId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("GeoObjectId")
                        .HasColumnType("uuid");

                    b.HasKey("GeoClassifierId", "GeoObjectId");

                    b.HasIndex("GeoObjectId");

                    b.ToTable("GeoObjectsGeoClassifiers");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeometryVersion", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("ArchiveTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double?>("AreaValue")
                        .HasColumnType("double precision");

                    b.Property<string>("AuthoritativeKnowledgeSource")
                        .HasColumnType("text");

                    b.Property<string>("BorderGeocodes")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreationTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("GeographicalObjectId")
                        .HasColumnType("uuid");

                    b.Property<double?>("NorthToSouthLength")
                        .HasColumnType("double precision");

                    b.Property<int?>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("Version")
                        .HasColumnType("integer");

                    b.Property<double?>("WestToEastLength")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("GeographicalObjectId");

                    b.ToTable("GeometryVersions");
                });

            modelBuilder.Entity("GISServer.Domain.Model.ParentChildObjectLink", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ChildGeographicalObjectId")
                        .HasColumnType("uuid");

                    b.Property<string>("ChildGeographicalObjectName")
                        .HasColumnType("text");

                    b.Property<bool?>("CompletelyIncludedFlag")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double?>("IncludedPercent")
                        .HasColumnType("double precision");

                    b.Property<DateTime?>("LastUpdatedDateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("ParentGeographicalObjectId")
                        .HasColumnType("uuid");

                    b.Property<string>("ParentGeographicalObjectName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ChildGeographicalObjectId");

                    b.HasIndex("ParentGeographicalObjectId");

                    b.ToTable("ParentChildObjectLinks");
                });

            modelBuilder.Entity("GISServer.Domain.Model.TopologyLink", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CommonBorder")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("GeographicalObjectInId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("GeographicalObjectOutId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("LastUpdatedDateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Predicate")
                        .HasColumnType("text");

                    b.Property<int?>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GeographicalObjectInId");

                    b.HasIndex("GeographicalObjectOutId");

                    b.ToTable("TopologyLinks");
                });

            modelBuilder.Entity("GISServer.Domain.Model.Aspect", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoObject", "GeographicalObject")
                        .WithMany("Aspects")
                        .HasForeignKey("GeographicalObjectId");

                    b.Navigation("GeographicalObject");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoClassifier", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoObjectInfo", null)
                        .WithMany("GeoClassifiers")
                        .HasForeignKey("GeoObjectInfoId");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObject", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoNamesFeature", "GeoNameFeature")
                        .WithMany("GeographicalObject")
                        .HasForeignKey("GeoNameFeatureId");

                    b.HasOne("GISServer.Domain.Model.GeometryVersion", "Geometry")
                        .WithMany()
                        .HasForeignKey("GeometryId");

                    b.Navigation("GeoNameFeature");

                    b.Navigation("Geometry");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObjectInfo", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoObject", "GeographicalObject")
                        .WithOne("GeoObjectInfo")
                        .HasForeignKey("GISServer.Domain.Model.GeoObjectInfo", "GeographicalObjectId");

                    b.Navigation("GeographicalObject");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObjectsGeoClassifiers", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoClassifier", "GeoClassifier")
                        .WithMany("GeoObjectsGeoClassifiers")
                        .HasForeignKey("GeoClassifierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GISServer.Domain.Model.GeoObjectInfo", "GeoObjectInfo")
                        .WithMany("GeoObjectsGeoClassifiers")
                        .HasForeignKey("GeoObjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GeoClassifier");

                    b.Navigation("GeoObjectInfo");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeometryVersion", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoObject", "GeographicalObject")
                        .WithMany("GeometryVersion")
                        .HasForeignKey("GeographicalObjectId");

                    b.Navigation("GeographicalObject");
                });

            modelBuilder.Entity("GISServer.Domain.Model.ParentChildObjectLink", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoObject", "ChildGeographicalObject")
                        .WithMany("ParentGeoObjects")
                        .HasForeignKey("ChildGeographicalObjectId");

                    b.HasOne("GISServer.Domain.Model.GeoObject", "ParentGeographicalObject")
                        .WithMany("ChildGeoObjects")
                        .HasForeignKey("ParentGeographicalObjectId");

                    b.Navigation("ChildGeographicalObject");

                    b.Navigation("ParentGeographicalObject");
                });

            modelBuilder.Entity("GISServer.Domain.Model.TopologyLink", b =>
                {
                    b.HasOne("GISServer.Domain.Model.GeoObject", "GeographicalObjectIn")
                        .WithMany("InputTopologyLinks")
                        .HasForeignKey("GeographicalObjectInId");

                    b.HasOne("GISServer.Domain.Model.GeoObject", "GeographicalObjectOut")
                        .WithMany("OutputTopologyLinks")
                        .HasForeignKey("GeographicalObjectOutId");

                    b.Navigation("GeographicalObjectIn");

                    b.Navigation("GeographicalObjectOut");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoClassifier", b =>
                {
                    b.Navigation("GeoObjectsGeoClassifiers");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoNamesFeature", b =>
                {
                    b.Navigation("GeographicalObject");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObject", b =>
                {
                    b.Navigation("Aspects");

                    b.Navigation("ChildGeoObjects");

                    b.Navigation("GeoObjectInfo");

                    b.Navigation("GeometryVersion");

                    b.Navigation("InputTopologyLinks");

                    b.Navigation("OutputTopologyLinks");

                    b.Navigation("ParentGeoObjects");
                });

            modelBuilder.Entity("GISServer.Domain.Model.GeoObjectInfo", b =>
                {
                    b.Navigation("GeoClassifiers");

                    b.Navigation("GeoObjectsGeoClassifiers");
                });
#pragma warning restore 612, 618
        }
    }
}