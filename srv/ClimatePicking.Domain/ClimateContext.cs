using System.Data.Entity;

namespace ClimatePicking.Domain
{
    public class ClimateContext : DbContext
    {
        public ClimateContext()
        {
            
        }

         public DbSet<Country> Countries { get; set; }
         public DbSet<City> Cities { get; set; }
         public DbSet<CityClimate> CityClimates { get; set; }
         public DbSet<CityClimateRecord> CityClimateRecords { get; set; }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}