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
    var jqueryPromise = new Promise($);
    var ymapsPromise = new Promise(ymaps.ready);
    Promise.all([jqueryPromise, ymapsPromise])
        .then(function(){
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
            var startCompare = function(){
                server.compareTemp(selected.leftName, selected.rightName, function(response){

                    // chart
                    var chartData = response.chartData;
                    enrichResponse(chartData);
                    if(chart != undefined){
                        chart.removeData();
                    }
                    chart = new Chart(dom.canvas, {
                        type: 'bar',
                        data: chartData
                    });

                    // map
                    var citiesData = response.citiesData;
                    ymaps.ready(function(){
                        var myMap = new ymaps.Map('map', {
                            center: [60.153151, 30.286574],
                            zoom: 13
                        });
                    });
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
                        startCompare();
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
                        startCompare();
                    }
                }
            });
        });
});