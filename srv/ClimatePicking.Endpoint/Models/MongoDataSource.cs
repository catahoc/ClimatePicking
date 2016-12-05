using System.Linq;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace ClimatePicking.Endpoint.Models
{
    public class MongoDataSource : IDataSource
    {
        static MongoDataSource()
        {
            BsonClassMap.RegisterClassMap<CityDto>();
            BsonClassMap.RegisterClassMap<ClimateEntry>();
        }

        public MongoDataSource()
        {
            var client = new MongoClient();
            var database = client.GetDatabase("climate");
            Cities = database.GetCollection<CityDto>("cities").AsQueryable();
        }

        public IQueryable<CityDto> Cities { get; private set; }
    }
}