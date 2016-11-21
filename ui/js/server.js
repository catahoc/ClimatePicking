/**
 * Created by Freddy on 21.11.2016.
 */
define(["config", "jquery"], function (config, $) {
    return {
        compareTemp: function(callback){
            $.getJSON(config.compareTemp, function(response){
                callback(response.baseCity, response.quotedCity);
            });
        },
        getCities: function(callback, fail){
            $.getJSON(config.getCities)
                .done(callback)
                .fail(fail);
        }
    };
});