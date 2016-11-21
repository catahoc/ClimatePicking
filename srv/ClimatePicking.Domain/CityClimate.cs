using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClimatePicking.Domain
{
    public class CityClimate
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public City TargetCity { get; set; }

        public ICollection<CityClimateRecord> Records { get; set; }
    }
}