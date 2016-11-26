/**
 * Created by Freddy on 21.11.2016.
 */
require.config({
    paths: {
        'jquery': 'util/jquery',
        'jquery-ui': 'util/jquery-ui',
        'Chart': 'util/Chart',
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

requirejs(["config", "server", "dom", "Chart", "climate-colors", "jquery", "jquery-ui", "ymaps"],
    function(config, server, dom, Chart, climateColors, $, _, ymaps) {
    var jqueryPromise = new Promise(function(resolve){
        $(resolve);
    });
    var ymapsPromise = new Promise(function(resolve){
        ymaps.ready(resolve);
    });
    Promise.all([jqueryPromise, ymapsPromise])
        .then(function(){
            var myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom:2
            });
            var chart;
            var selected = {
                left: false,
                leftName: '',
                right: false,
                rightName: ''
            };
            var enrichResponse = function(response){
                for(var i = 0; i < response.datasets.length; ++i){
                    response.datasets[i].backgroundColor = response.datasets[i].data.map(climateColors.pickColor);
                }
                response.scales = {yAxes: [{scaleLabel: {display: true, lavelString: '°C'}}]};
            };
            var startCompareByNames = function(leftName, rightName){
                server.compareTemp(leftName, rightName, function(response){

                    // chart
                    var chartData = response.chartData;
                    enrichResponse(chartData);
                    var canvas = $(dom.canvasMarkup);
                    dom.canvasHolder.empty().append(canvas);
                    var chart = new Chart(canvas, {
                        type: 'bar',
                        data: chartData
                    });

                    // map
                    var citiesData = response.citiesData;
                    var cities = new ymaps.GeoObjectCollection(null);
                    cities.add(new ymaps.Placemark(citiesData.baseCity.latlon, { iconCaption: citiesData.baseCity.Name}));
                    cities.add(new ymaps.Placemark(citiesData.quotedCity.latlon, { iconCaption: citiesData.quotedCity.Name}));
                    myMap.geoObjects.removeAll();
                    myMap.geoObjects.add(cities);
                    myMap.setBounds(cities.getBounds());
                });
            };
            dom.leftCity.autocomplete({
                source: config.searchCities,
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
                source: config.searchCities,
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
        });
});