namespace ClimatePicking.Endpoint.Models
{
    public class ClimateEntry
    {
        public string Month { get; set; }
        public int MonthIndex { get; set; }
        public double AvgMin { get; set; }
        public double AbsMax { get; set; }
    }
}