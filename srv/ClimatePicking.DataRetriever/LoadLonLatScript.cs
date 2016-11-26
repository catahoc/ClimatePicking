using System;
using System.Data.Entity;
using System.Linq;
using ClimatePicking.Domain;

namespace ClimatePicking.DataRetriever
{
    public class LoadLonLatScript
    {
        public static void Do()
        {
            var countries = CountryRecord.Retrieve();
            using (var context = new ClimateContext())
            {
                var dbCountries = context.Countries.Include(x => x.Cities).ToList();
                var joined = countries.Join(dbCountries, x => x.name, x => x.Name, (dto, db) => new {dto, db});
                foreach (var pair in joined)
                {
                    if (pair.dto.latlng != null && pair.dto.latlng.Length == 2)
                    {
                        foreach (var city in pair.db.Cities)
                        {
                            city.Lat = pair.dto.latlng[0];
                            city.Lon = pair.dto.latlng[1];
                        }
                    }
                }
                context.SaveChanges();
            }
        }
    }
}