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

builder.Services.AddScoped<IGeoObjectRepository, GeoObjectRepository>();
//builder.Services.AddScoped<IClassifierRepository, ClassifierRepository>();
//builder.Services.AddScoped<ITopologyRepository, TopologyRepository>();
//builder.Services.AddScoped<IAspectRepository, AspectRepository>();
//builder.Services.AddScoped<IGeoObjectClassifiersRepository, GeoObjectClassifiersRepository>();

builder.Services.AddSingleton<GeoObjectMapper>();
builder.Services.AddSingleton<ClassifierMapper>();
builder.Services.AddSingleton<TopologyService>();
builder.Services.AddSingleton<AspectMapper>();


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
