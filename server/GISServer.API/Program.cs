using GISServer.API.Service;
using GISServer.API.Mapper;
using GISServer.Domain.Model;
using GISServer.Infrastructure.Data;
using GISServer.Infrastructure.Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<Context>();

builder.Services.AddScoped<IGeoObjectService, GeoObjectService>();
builder.Services.AddScoped<IClassifierService, ClassifierService>();
builder.Services.AddScoped<IAspectService, AspectService>();
builder.Services.AddScoped<ITopologyService, TopologyService>();
builder.Services.AddScoped<IGeoObjectClassifiersService, GeoObjectClassifiersService>();
builder.Services.AddScoped<IParentChildService, ParentChildService>();

builder.Services.AddScoped<IGeoObjectRepository, GeoObjectRepository>();
<<<<<<< HEAD
//builder.Services.AddScoped<IClassifierRepository, ClassifierRepository>();
//builder.Services.AddScoped<ITopologyRepository, TopologyRepository>();
//builder.Services.AddScoped<IAspectRepository, AspectRepository>();
=======
builder.Services.AddScoped<IClassifierRepository, ClassifierRepository>();
builder.Services.AddScoped<ITopologyRepository, TopologyRepository>();
builder.Services.AddScoped<IAspectRepository, AspectRepository>();
builder.Services.AddScoped<IGeoObjectsClassifiersRepository, GeoObjectsClassifiersRepository>();
<<<<<<< HEAD
>>>>>>> f7ad924ea7ca3b79b54bc3c12d8cad91a905e317
=======
builder.Services.AddScoped<IParentChildRepository, ParentChildRepository>();
>>>>>>> a44333b7008197c897c747ea4f866317742d6172

builder.Services.AddSingleton<GeoObjectMapper>();
builder.Services.AddSingleton<ClassifierMapper>();
builder.Services.AddSingleton<TopologyMapper>();
builder.Services.AddSingleton<AspectMapper>();
builder.Services.AddScoped<ParentChildMapper>();
builder.Services.AddSingleton<GeoObjectClassifiersMapper>();

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors((options) => {
    options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
