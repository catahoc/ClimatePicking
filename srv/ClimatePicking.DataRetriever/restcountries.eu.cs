namespace ClimatePicking.DataRetriever
{
    public class CountryRecord
    {
        public static CountryRecord[] Retrieve()
        {
            return Json.MakeRequest<CountryRecord[]>("https://restcountries.eu/rest/v1/all");
        }

        public string name { get; set; }

        public string capital { get; set; }

        public double[] latlng { get; set; }

        public int population { get; set; }
    }
}