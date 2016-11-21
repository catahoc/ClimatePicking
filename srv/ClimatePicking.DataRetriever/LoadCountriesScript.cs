using System;
using System.Linq;
using ClimatePicking.Domain;

namespace ClimatePicking.DataRetriever
{
    public class LoadCountriesScript
    {
        public static void Do()
        {
            var countries = CountryRecord.Retrieve();
            using (var context = new ClimateContext())
            {
                context.Countries.RemoveRange(context.Countries.ToList());
                foreach (var country in countries.OrderByDescending(x => x.population))
                {
                    var dbCountry = new Domain.Country
                    {
                        Name = country.name,
                        Population = country.population
                    };
                    context.Countries.Add(dbCountry);

                    var capital = new Domain.City
                    {
                        IsCapital = true,
                        Country = dbCountry,
                        Name = country.capital
                    };
                    context.Cities.Add(capital);
                    Console.WriteLine("{0} - done", country.name);
                }
                context.SaveChanges();
            }
        }
    }
}