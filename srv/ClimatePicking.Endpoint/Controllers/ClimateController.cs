using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using ClimatePicking.Domain;
using ClimatePicking.Endpoint.Models;

namespace ClimatePicking.Endpoint.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClimateController : ApiController
    {
        private readonly IDataSource context;
        private readonly IModelsConverter converter;

        public ClimateController(IDataSource context, IModelsConverter converter)
        {
            this.context = context;
            this.converter = converter;
        }

        [HttpGet]
        public object CompareTemp(string baseCityName, string quotedCityName)
        {
            var baseCity = context.Cities.FirstOrDefault(x => x.Name == baseCityName);
            var quotedCity = context.Cities.FirstOrDefault(x => x.Name == quotedCityName);

            var chartData = new
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
            };
            var citiesData = new
            {
                baseCity = new {baseCity.Name, latlon = new[] {baseCity.Lat, baseCity.Lon}},
                quotedCity = new { quotedCity.Name, latlon = new[] { quotedCity.Lat, quotedCity.Lon}}
            };
            return Json(new { chartData, citiesData, bounds = new[] { new[] { baseCity.Lat, baseCity.Lon } , new[] { quotedCity.Lat, quotedCity.Lon } } });
        }

        [HttpGet]
        public object Cities()
        {
            var cities = context.Cities;


            return Json(cities);
        }

        [HttpGet]
        public object FindCities(string term)
        {
            var cities = context.Cities.Where(x => x.Name.StartsWith(term, StringComparison.InvariantCultureIgnoreCase)).Select(x => x.Name).ToArray();

            return Json(cities);
        }
    }
}
