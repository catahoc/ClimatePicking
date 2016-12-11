define(["server", "charts", "jquery", "maps", "url-utils"],
    function (server, charts, $, maps, urlUtils) {
        return {
            load: function (args) {
                let leftCity = $('#leftCity');
                let rightCity = $('#rightCity');
                let myMap = maps.createMap('map');
                let startCompareByNames = function (leftName, rightName) {
                    server.compareTemp(leftName, rightName, function (response) {

                        // chart
                        let chartData = response.chartData;
                        let chart = charts.createChart($('#chartHolder'));
                        chart.render(chartData);

                        // map
                        let citiesData = response.citiesData;
                        myMap.setMarks(citiesData.map(x => maps.createMark(x.latlon, x.name)), true);
                    });
                };
                leftCity.autocomplete({
                    source: server.searchCities,
                    minLength: 2,
                    delay: 300,
                    select: function (data, value) {
                        args.left = value.item.value;
                        urlUtils.setUrl(args);
                        if (args.right) {
                            startCompareByNames(args.left, args.right);
                        }
                    }
                });
                rightCity.autocomplete({
                    source: server.searchCities,
                    minLength: 2,
                    delay: 300,
                    select: function (data, value) {
                        args.right = value.item.value;
                        urlUtils.setUrl(args);
                        if (args.left) {
                            startCompareByNames(args.left, args.right);
                        }
                    }
                });
                if(args.left)
                {
                    leftCity.val(args.left);
                }
                if(args.right)
                {
                    rightCity.val(args.right);
                }
                if(args.left && args.right)
                {
                    startCompareByNames(args.left, args.right);
                }
            }
        };
    });