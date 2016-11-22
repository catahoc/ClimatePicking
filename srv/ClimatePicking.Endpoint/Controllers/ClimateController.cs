using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using ClimatePicking.Domain;
using ClimatePicking.Endpoint.Models;

namespace ClimatePicking.Endpoint.Controllers
{
    [EnableCors(origins: "http://localhost:63342", headers: "*", methods: "*")]
    public class ClimateController : ApiController
    {
        private readonly ClimateContext context;
        private readonly IModelsConverter converter;

        public ClimateController(ClimateContext context, IModelsConverter converter)
        {
            this.context = context;
            this.converter = converter;
        }

        [HttpGet]
        public object CompareTemp(string baseCityName, string quotedCityName)
        {
            var baseCity = converter.ToDto(context.Cities.SingleOrDefault(x => x.Name == baseCityName));
            var quotedCity = converter.ToDto(context.Cities.SingleOrDefault(x => x.Name == quotedCityName));

            return Json(new
            {
                labels = baseCity.Entries.Select(x => x.Month).ToArray(),
                datasets = new[]
                {
                    new
                    {
                        label = baseCityName,
                        data = baseCity.Entries.Select(x => x.AvgMin).ToArray()
                    },
                    new
                    {
                        label = quotedCityName,
                        data = quotedCity.Entries.Select(x => x.AvgMin).ToArray()
                    },
                }
            });
        }

        [HttpGet]
        public object Cities()
        {
            var cities = context.Cities.ToArray().Select(converter.ToDto);


            return Json(cities);
        }

        [HttpGet]
        public object FindCities(string term)
        {
            var cities = context.Cities.Where(x => x.Name.StartsWith(term)).Select(x => x.Name).ToArray();

            return Json(cities);
        }
    }
}
