using Microsoft.Practices.Unity;
using System.Web.Http;
using ClimatePicking.Domain;
using ClimatePicking.Endpoint.Models;
using Unity.WebApi;

namespace ClimatePicking.Endpoint
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            container.RegisterType<ClimateContext>(new ContainerControlledLifetimeManager());
            container.RegisterType<IModelsConverter, ModelsConverter>(new ContainerControlledLifetimeManager());
        }
    }
}