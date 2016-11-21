using ClimatePicking.Domain;

namespace ClimatePicking.Endpoint.Models
{
    public interface IModelsConverter
    {
        ClimateEntry ToDto(CityClimateRecord climate);
        CityDto ToDto(City city);
    }
}