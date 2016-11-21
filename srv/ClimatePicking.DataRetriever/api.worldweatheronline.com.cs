namespace ClimatePicking.DataRetriever
{
    public class dataHolder
    {
        public data data { get; set; }
    }
    public class data
    {
        public static data Retrieve(string location)
        {
            return Json.MakeRequest<dataHolder>($"http://api.worldweatheronline.com/premium/v1/weather.ashx?key=08e876b9d826477c8cf205257161511&q={location}&num_of_days=2&tp=3&format=json").data;
        }

        public ClimateAverage[] ClimateAverages { get; set; }
    }

    public class ClimateAverage
    {
        public month[] month { get; set; }
    }

    public class month
    {
        public int index { get; set; }
        public string name { get; set; }
        public double avgMinTemp { get; set; }
        public double avgMinTemp_F { get; set; }
        public double absMaxTemp { get; set; }
        public double absMaxTemp_F { get; set; }
    }
}