define(["server", "charts", "jquery", "maps"],
    function (server, charts, $, maps) {
        return {
            load: function () {
                let myMap = maps.createMap('map');
                let selected = {
                    left: false,
                    leftName: '',
                    right: false,
                    rightName: ''
                };
                let startCompareByNames = function (leftName, rightName) {
                    server.compareTemp(leftName, rightName, function (response) {

                        // chart
                        let chartData = response.chartData;
                        let chart = charts.createChart($('#chartHolder'));
                        chart.render(chartData);

                        // map
                        var citiesData = response.citiesData;
                        myMap.setMarks(citiesData.map(x => maps.createMark(x.latlon, x.name)), true);
                    });
                };
                $('#leftCity').autocomplete({
                    source: server.searchCities,
                    minLength: 2,
                    delay: 300,
                    select: function (data, value) {
                        selected.left = true;
                        selected.leftName = value.item.value;
                        if (selected.right) {
                            startCompareByNames(selected.leftName, selected.rightName);
                        }
                    }
                });
                $('#rightCity').autocomplete({
                    source: server.searchCities,
                    minLength: 2,
                    delay: 300,
                    select: function (data, value) {
                        selected.right = true;
                        selected.rightName = value.item.value;
                        if (selected.left) {
                            startCompareByNames(selected.leftName, selected.rightName);
                        }
                    }
                });
                startCompareByNames('Moscow', 'London');
            }
        };
    });