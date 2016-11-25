/**
 * Created by Freddy on 21.11.2016.
 */
require.config({
    paths: {
        'jquery': 'util/jquery',
        'jquery-ui': 'util/jquery-ui',
        'Chart': 'util/Chart'
    },
    urlArgs: "bust=" + (new Date()).getTime(),

    shim: {
        jquery: {
            exports: "$"
        }
    }

});

requirejs(["config", "server", "renderer", "dom", "Chart", "climate-colors", "jquery", "jquery-ui"], function(config, server, renderer, dom, Chart, climateColors, $) {
    $(function(){
        var chart;
        var selected = {
            left: false,
            leftName: '',
            right: false,
            rightName: ''
        };
        var startCompare = function(){
            server.compareTemp(selected.leftName, selected.rightName, function(response){
                climateColors.enrichResponse(response);
                if(chart != undefined){
                    chart.removeData();
                }
                chart = new Chart(dom.canvas, {
                    type: 'bar',
                    data: response
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

        dom.leftCity
    });
});