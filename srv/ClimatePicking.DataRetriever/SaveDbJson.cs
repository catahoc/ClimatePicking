using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Serialization.Json;
using ClimatePicking.Domain;
using ClimatePicking.Endpoint.Models;

namespace ClimatePicking.DataRetriever
{
    public class SaveDbJson
    {
        public static void Do()
        {
            ////using (var context = new ClimateContext())
            ////{
            ////    var countries = context.Countries.ToArray().Select(x => new CountryDto
            ////    {
            ////        Name = x.Name,
            ////        Population = x.Population,
            ////        Cities = x.Cities.ToArray().Select(y => new CityDto
            ////        {
            ////            Name = y.Name,
            ////            Capital = y.IsCapital,
            ////            Climates = y.Climates.ToArray().Select(z => new ClimateDto
            ////            {
            ////                Entries = z.Records?.ToArray().Select(a => new ClimateEntry
            ////                {
            ////                    Month = a.Month,
            ////                    MonthIndex = a.MonthIndex,
            ////                    AvgMin = a.AvgMin,
            ////                    AbsMax = a.AbsMax
            ////                }).ToArray()
            ////            }).ToArray()
            ////        }).ToArray()
            ////    }).ToArray();
            ////    DataContractJsonSerializer jsonSerializer = new DataContractJsonSerializer(countries.GetType());
            ////    using (var memoryStream = new MemoryStream())
            ////    {
            ////        jsonSerializer.WriteObject(memoryStream, countries);
            ////        File.WriteAllBytes("../../../../shared/data.json", memoryStream.GetBuffer());
            ////    }
            ////}
        } 
    }
}