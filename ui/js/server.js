/**
 * Created by Freddy on 21.11.2016.
 */
define(["config", "jquery"], function (config, $) {
    return {
        compareTemp: function(baseCity, quotedCity, callback){
            var args = {
                baseCity: baseCity,
                quotedCity: quotedCity
            };
            $.getJSON(config.compareTemp, args, function(response){
                callback(response);
            });
        },
        getCities: function(callback, fail){
            $.getJSON(config.getCities)
                .done(callback)
                .fail(fail);
        }
    };
});