/**
 * Created by Freddy on 21.11.2016.
 */
define(["jquery"], function ($) {
    let endpoint = 'http://192.168.1.33:10800';
    let compareTempAppendix = 'api/Climate/CompareTemp';
    let searchInBounds = 'api/Climate/SearchInBounds';
    let getCitiesAppendix = 'api/Climate/Cities';
    let findCitiesAppendix = 'api/Climate/FindCities';
    return {
        searchCities: endpoint + '/' + findCitiesAppendix,
        compareTemp: function(baseCity, quotedCity, callback){
            let args = {
                baseCityName: baseCity,
                quotedCityName: quotedCity
            };
            $.getJSON(endpoint + '/' + compareTempAppendix, args, function(response){
                callback(response);
            });
        },
        requestCities: function(newBounds, month, callback){
            $.getJSON(endpoint + '/' + searchInBounds, args = {
                lat1: newBounds[0][0],
                lat2: newBounds[1][0],
                lon1: newBounds[0][1],
                lon2: newBounds[1][1],
                month: month
            }, callback)
        }
    };
});