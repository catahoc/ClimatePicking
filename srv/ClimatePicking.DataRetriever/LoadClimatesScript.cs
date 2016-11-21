using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using ClimatePicking.Domain;

namespace ClimatePicking.DataRetriever
{
    public class LoadClimatesScript
    {
        public static void Do()
        {
            using (var context = new ClimateContext())
            {
                var capitals = context.Cities.OrderByDescending(x => x.Country.Population).ToList();
                var index = 0;
                foreach (var capital in capitals)
                {
                    var itsClimate = capital.Climates.ToList();
                    if (!itsClimate.Any() && !string.IsNullOrEmpty(capital.Name))
                    {
                        var capitalClimate = data.Retrieve(capital.Name);
                        try
                        {
                            var records = capitalClimate.ClimateAverages[0].month.Select(m => new CityClimateRecord
                            {
                                AbsMax = m.absMaxTemp,
                                AbsMaxFahr = m.absMaxTemp_F,
                                AvgMin = m.avgMinTemp,
                                AvgMinFahr = m.avgMinTemp_F,
                                Month = m.name,
                                MonthIndex = m.index
                            }).ToList();
                            var climate = new CityClimate
                            {
                                TargetCity = capital,
                                Records = new List<CityClimateRecord>(records)
                            };
                            context.CityClimates.Add(climate);
                            context.CityClimateRecords.AddRange(records);
                            context.SaveChanges();
                            Console.WriteLine("{0} - processed, {1}/{2} to do", capital.Name, capitals.Count - ++index,
                                capitals.Count);
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("{0} - failed, {1}/{2} to do", capital.Name, capitals.Count - ++index,
                                capitals.Count);
                        }
                        Thread.Sleep(2000);
                    }
                    else
                    {
                        Console.WriteLine("{0} - skipped, {1}/{2} to do", capital.Name, capitals.Count - ++index, capitals.Count);
                    }
                }

            }
            Console.ReadLine();
        }

    }
}