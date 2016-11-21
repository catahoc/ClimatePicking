namespace ClimatePicking.Endpoint.Models
{
    public class CityDto
    {
        public string Name { get; set; }
        public bool Capital { get; set; }
        public ClimateEntry[] Entries { get; set; }
    }
}