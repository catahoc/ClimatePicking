using System.Linq;
using System.Web.Http;
using ClimatePicking.Domain;
using ClimatePicking.Endpoint.Models;

namespace ClimatePicking.Endpoint.Controllers
{
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
        public object CompareTemp(string baseCityName = "Moscow", string quotedCityName = "London")
        {
            var baseCity = converter.ToDto(context.Cities.SingleOrDefault(x => x.Name == baseCityName));
            var quotedCity = converter.ToDto(context.Cities.SingleOrDefault(x => x.Name == quotedCityName));


            return Json(new { baseCity, quotedCity });
        }
    }
}
