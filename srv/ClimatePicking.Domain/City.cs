using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClimatePicking.Domain
{
    public class City
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public bool IsCapital { get; set; }

        public string Name { get; set; }

        public Country Country { get; set; }

        public virtual ICollection<CityClimate> Climates { get; set; }

        public double Lon { get; set; }

        public double Lat { get; set; }
    }
}