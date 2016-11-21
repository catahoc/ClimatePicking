using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ClimatePicking.Endpoint.Startup))]

namespace ClimatePicking.Endpoint
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}