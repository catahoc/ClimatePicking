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
            var baseCity = context.Cities.SingleOrDefault(x => x.Name == baseCityName);
            var quotedCity = context.Cities.SingleOrDefault(x => x.Name == quotedCityName);

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
