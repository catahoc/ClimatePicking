using System.Dynamic;

namespace ClimatePicking.Endpoint.Models
{
    public class NatchingCitiesArgs
    {
        public MonthRestriction[] Restrictions { get; set; }
    }
    public class MonthRestriction
    {
        public string Name { get; set; } 
        public int Weather { get; set; }
        public int Index { get; set; }
    }
}