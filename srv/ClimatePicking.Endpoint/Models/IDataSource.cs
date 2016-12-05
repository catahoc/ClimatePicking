using System.Linq;

namespace ClimatePicking.Endpoint.Models
{
    public interface IDataSource
    {
        IQueryable<CityDto> Cities { get; }
    }
}