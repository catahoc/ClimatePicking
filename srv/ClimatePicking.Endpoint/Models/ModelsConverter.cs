using System.Linq;
using ClimatePicking.Domain;

namespace ClimatePicking.Endpoint.Models
{
    public class ModelsConverter : IModelsConverter
    {
        public CityDto ToDto(City city)
        {
            return new CityDto
            {
                Id = city.Id,
                Name = city.Name,
                Capital = city.IsCapital,
                Entries = city.Climates.FirstOrDefault()?.Records?.ToArray().OrderBy(x => x.MonthIndex).Select(ToDto).ToArray()
            };
        }

        public ClimateEntry ToDto(CityClimateRecord climate)
        {
            return new ClimateEntry
            {
                MonthIndex = climate.MonthIndex,
                Month = climate.Month,
                AvgMin = climate.AvgMin,
                AbsMax = climate.AbsMax
            };
        }
    }
}