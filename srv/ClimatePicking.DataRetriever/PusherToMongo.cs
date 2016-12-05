using System.Diagnostics;
using ClimatePicking.Endpoint.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace ClimatePicking.DataRetriever
{
    public class PusherToMongo
    {
        public static void Do()
        {
            BsonClassMap.RegisterClassMap<ClimateEntry>().AutoMap();
            BsonClassMap.RegisterClassMap<CityDto>().AutoMap();
            var client = new MongoClient();
            var db = client.GetDatabase("climate");
            var cities = db.GetCollection<CityDto>("cities");
            var source = new JsonDataSource();
            cities.InsertMany(source.Cities);
        }
    }
    public class ReaderFromMongo
    {
        public static void Do()
        {
            BsonClassMap.RegisterClassMap<ClimateEntry>().AutoMap();
            BsonClassMap.RegisterClassMap<CityDto>().AutoMap();
            var client = new MongoClient();
            var db = client.GetDatabase("climate");
            var cities = db.GetCollection<CityDto>("cities");
            foreach (var city in cities.AsQueryable())
            {
                Debug.Print(city.Name);
            }
        }
    }
}