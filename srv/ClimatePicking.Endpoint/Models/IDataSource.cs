namespace ClimatePicking.Endpoint.Models
{
    public interface IDataSource
    {
        CityDto[] Cities { get; }
    }
}