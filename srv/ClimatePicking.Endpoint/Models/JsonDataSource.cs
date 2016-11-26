using System.IO;
using System.Web.Helpers;
using System.Web.Hosting;

namespace ClimatePicking.Endpoint.Models
{
    public class JsonDataSource : IDataSource
    {
        public JsonDataSource()
        {
            var mapPath = HostingEnvironment.MapPath("~/bin/data.json");
            var jsonText = File.ReadAllText(mapPath);
            Cities = Json.Decode<CityDto[]>(jsonText);
        }

        public CityDto[] Cities { get; private set; }
    }
}