/**
 * Created by Freddy on 21.11.2016.
 */
define(function () {
    var endpoint = 'http://localhost:9921';
    var compareTempAppendix = 'api/Climate/CompareTemp';
    var getCitiesAppendix = 'api/Climate/Cities';
    return {
        compareTemp: endpoint + '/' + compareTempAppendix,
        getCities: endpoint + '/' + getCitiesAppendix
    };
});