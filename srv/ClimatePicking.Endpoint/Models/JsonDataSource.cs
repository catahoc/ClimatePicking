using System.IO;
using System.Linq;
using System.Web.Helpers;
using System.Web.Hosting;

namespace ClimatePicking.Endpoint.Models
{
    public class JsonDataSource : IDataSource
    {
        public JsonDataSource()
        {
            var mapPath = HostingEnvironment.MapPath("~/bin/data.json");
            if (mapPath == null)
            {
                // maybe not web server?
                mapPath = "data.json";
            }
            var jsonText = File.ReadAllText(mapPath);
            Cities = Json.Decode<CityDto[]>(jsonText).AsQueryable();
        }

        public IQueryable<CityDto> Cities { get; private set; }
    }
}