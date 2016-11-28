/**
 * Created by Freddy on 28.11.2016.
 */
define(["util/Chart", "climate-colors"], function(chart, climateColors){
    let enrichResponse = function(response){
        for(let i = 0; i < response.datasets.length; ++i){
            response.datasets[i].backgroundColor = response.datasets[i].data.map(climateColors.pickColor);
        }
        response.scales = {yAxes: [{scaleLabel: {display: true, labelString: '°C'}}]};
    };
    let canvasMarkup = '<canvas id="weatherCompareChart" width="400" height="400"></canvas>';

    return {
        createChart: function(container){
            return {
                render: function(chartData){
                    enrichResponse(chartData);
                    let canvas = $(canvasMarkup);
                    container.empty().append(canvas);
                    let chart = new Chart(canvas, {
                        type: 'bar',
                        data: chartData
                    });
                }
            }
        }
    };
});