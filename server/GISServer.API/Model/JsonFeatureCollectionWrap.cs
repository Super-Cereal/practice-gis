using Newtonsoft.Json;
using System.Reflection;

namespace GISServer.API.Model
{
    public class JsonFeatureCollectionWrap<TModel>
    {
        public static async ValueTask<TModel?> BindAsync(HttpContext context, ParameterInfo parameter)
        {
            if (!context.Request.HasJsonContentType())
            {
                throw new BadHttpRequestException(
                  "Request content type was not a recognized JSON content type.",
                  StatusCodes.Status415UnsupportedMediaType);
            }

            using var sr = new StreamReader(context.Request.Body);
            var str = await sr.ReadToEndAsync();

            return JsonConvert.DeserializeObject<TModel>(str);
        }
    }
}
