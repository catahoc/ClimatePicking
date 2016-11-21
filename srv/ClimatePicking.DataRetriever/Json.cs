using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Runtime.Serialization.Json;

namespace ClimatePicking.DataRetriever
{
    public class Json
    {
        public static TResponse MakeRequest<TResponse>(string requestUrl) where TResponse : class
        {
            try
            {
                HttpWebRequest request = WebRequest.Create(requestUrl) as HttpWebRequest;
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    if (response.StatusCode != HttpStatusCode.OK)
                        throw new Exception(String.Format(
                        "Server error (HTTP {0}: {1}).",
                        response.StatusCode,
                        response.StatusDescription));
                    DataContractJsonSerializer jsonSerializer = new DataContractJsonSerializer(typeof(TResponse));
                    object objResponse = jsonSerializer.ReadObject(response.GetResponseStream());
                    //var readToEnd = new StreamReader(response.GetResponseStream()).ReadToEnd();
                    //Debug.Print(readToEnd);
                    TResponse jsonResponse = objResponse as TResponse;
                    return jsonResponse;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}