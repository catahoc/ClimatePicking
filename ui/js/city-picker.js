define(["jquery", "server", "charts", "maps"], function($, server, charts, maps){
    return {
        load: function(){
            let myMap = maps.createMap('map');
            let findCityBtn = $('#find-city');
            let findCityResult = $('#find-city-result');
            let monthTempPickerProto = $('.month-temp-picker-proto');
            let pickers = $('#month-temp-pickers');
            let makeMonth = (n , i) => { return {name: n, index: i}};
            let months = [
                makeMonth("Jan", 1),
                makeMonth("Feb", 2),
                makeMonth("Mar", 3),
                makeMonth("Apr", 4),
                makeMonth("May", 5),
                makeMonth("Jun", 6),
                makeMonth("Jul", 7),
                makeMonth("Aug", 8),
                makeMonth("Sep", 9),
                makeMonth("Oct", 10),
                makeMonth("Nov", 11),
                makeMonth("Dec", 12)
            ];
            $.each(months, (index, month) => {
                let monthTempPicker = monthTempPickerProto.clone().addClass('month-temp-picker').appendTo(pickers);
                var monthName = monthTempPicker.find('.month-name');
                let enabler = monthTempPicker.find('.slider-control');
                let slider = monthTempPicker.find('.slider').slider({
                    min: -50,
                    max: 50,
                    slide: function(){
                        month.weather = slider.slider("value");
                        //$(this).next('.slider-control').removeClass('slider-disabled').addClass('slider-enabled');
                        enabler.removeClass('slider-disabled').addClass('slider-enabled');
                        monthName.html(month.name + ' - ' + month.weather)
                    }
                });
                enabler.click(function(){
                    if(enabler.hasClass('slider-enabled')){
                        month.weather = undefined;
                        //$(this).removeClass('slider-enabled').addClass('slider-disabled');
                        enabler.removeClass('slider-enabled').addClass('slider-disabled');
                        monthName.html(month.name + ' - any');
                    }
                });
                monthName.html(month.name + ' - any');
            });
            monthTempPickerProto.hide();
            findCityBtn.click(function(){
                server.requestMatchingCities(months.filter(x => x.weather != undefined), function(response){
                    let chart = charts.createChart(findCityResult);
                    chart.render(response.chartData);
                    myMap.setMarks(response.citiesData.map(x => maps.createMark(x.latlon, x.name)), true);
                });
            });
        }
    }
});