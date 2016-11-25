using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Serialization.Json;
using ClimatePicking.Domain;
using ClimatePicking.Endpoint.Models;
using Newtonsoft.Json;

namespace ClimatePicking.DataRetriever
{
    public class SaveDbJson
    {
        public static void Do()
        {
            var converter = new ModelsConverter();
            using (var context = new ClimateContext())
            {
                var cities = context.Cities.Include(x => x.Country).ToList().Select(converter.ToDto).ToArray();
                var path = "../../../../shared/data.json";
                File.WriteAllText(path, JsonConvert.SerializeObject(cities));
            }
        }
    }
}