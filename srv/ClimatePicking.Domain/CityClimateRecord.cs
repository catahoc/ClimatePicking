using System.ComponentModel.DataAnnotations.Schema;

namespace ClimatePicking.Domain
{
    public class CityClimateRecord
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string Month { get; set; }

        public int MonthIndex { get; set; }

        public double AvgMin { get; set; }

        public double AbsMax { get; set; }

        public double AvgMinFahr { get; set; }

        public double AbsMaxFahr { get; set; }
    }
}