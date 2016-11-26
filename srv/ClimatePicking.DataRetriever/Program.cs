using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ClimatePicking.Domain;

namespace ClimatePicking.DataRetriever
{
    class Program
    {
        static void Main(string[] args)
        {
            SaveDbJson.Do();
        }
    }
}
