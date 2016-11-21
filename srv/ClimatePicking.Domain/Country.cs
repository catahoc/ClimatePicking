using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClimatePicking.Domain
{
    public class Country
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string Name { get; set; }

        public int Population { get; set; }

        public virtual ICollection<City> Cities { get; set; }
    }
}