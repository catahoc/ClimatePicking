namespace ClimatePicking.Endpoint.Models
{
    public class CountryDto
    {
        public string Name { get; set; }
        public int Population { get; set; }
        public CityDto[] Cities { get; set; }
    }
}