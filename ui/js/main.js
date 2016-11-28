/**
 * Created by Freddy on 21.11.2016.
 */
require.config({
    paths: {
        'jquery': 'util/jquery',
        'jquery-ui': 'util/jquery-ui',
        'ymaps': '//api-maps.yandex.ru/2.1/?lang=ru-RU'
    },
    urlArgs: "bust=" + (new Date()).getTime(),

    shim: {
        jquery: {
            exports: "$"
        },
        ymaps: {
            exports: 'ymaps'
        }
    }

});

requirejs(["server", "dom", "charts", "jquery", "jquery-ui", "maps", "climate-colors"],
    function(server, dom, charts, $, _, maps, colors) {
        let jqueryPromise = new Promise(function(resolve){
            $(resolve);
        });
        Promise.all([jqueryPromise, maps.promise])
        .then(function(){
            let myMap = maps.createMap('map');
            let selected = {
                left: false,
                leftName: '',
                right: false,
                rightName: ''
            };
            let startCompareByNames = function(leftName, rightName){
                server.compareTemp(leftName, rightName, function(response){

                    // chart
                    let chartData = response.chartData;
                    let chart = charts.createChart(dom.canvasHolder);
                    chart.render(chartData);

                    // map
                    var citiesData = response.citiesData;
                    myMap.setMarks([
                        maps.createMark(citiesData.baseCity.latlon, citiesData.baseCity.name),
                        maps.createMark(citiesData.quotedCity.latlon, citiesData.quotedCity.name)
                    ], true);
                });
            };
            dom.leftCity.autocomplete({
                source: server.searchCities,
                minLength: 2,
                delay: 300,
                select : function(data, value) {
                    selected.left = true;
                    selected.leftName = value.item.value;
                    if(selected.right){
                        startCompareByNames(selected.leftName, selected.rightName);
                    }
                }
            });
            dom.rightCity.autocomplete({
                source: server.searchCities,
                minLength: 2,
                delay: 300,
                select : function(data, value) {
                    selected.right = true;
                    selected.rightName = value.item.value;
                    if(selected.left){
                        startCompareByNames(selected.leftName, selected.rightName);
                    }
                }
            });
            startCompareByNames('Moscow', 'London');

            var map2 = maps.createMap('map2');
            var rebound = function(){
                server.requestCities(map2.getBounds(), dom.monthPicker.val(), function(cities){
                    map2.setMarks(cities.map(x => maps.createMark(x.latlon, x.name, colors.pickColor(x.temp), x.temp)), false);
                });
            };
            dom.monthPicker.change(rebound);
            map2.boundsChange(rebound);
            rebound();
        });
});