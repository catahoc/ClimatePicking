namespace ClimatePicking.Endpoint.Models
{
    public class CityDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public bool Capital { get; set; }
        public ClimateEntry[] Entries { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}