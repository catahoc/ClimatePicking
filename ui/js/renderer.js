/**
 * Created by Freddy on 22.11.2016.
 */
define(["jquery", "root"], function ($, root) {
    return {
        createImage: function (imgName) {
            return $('<img/>').attr('src', 'img/' + imgName);
        },
        renderWaiting: function () {
            root.empty();
            root.append(this.createImage('loading.gif'));
        },
        createCitiesSelect: function (cities) {
            var def = $('<option/>').html('Pick a city');
            def.attr('disabled');
            def.attr('selected');
            var select = $('<select/>').append(def);
            $.each(cities, function (id, city) {
                select.append($('<option/>').attr('value', city.Id).html(city.Name));
            })
            return select;
        },
        renderCities: function (cities) {
            root.empty();
            var leftSelect = this.createCitiesSelect(cities).addClass('leftSelect');
            var rightSelect = this.createCitiesSelect(cities).addClass('rightSelect');
            var selects = $('<div/>').append(leftSelect).append(rightSelect);
            root.append(selects);
        },
        renderError: function(ex){
            root.empty();
            var msg = $('<div class="error"/>');
            msg.append('<h2>Unfortunately, an error occured :(</h2>').append(ex.responseText);
            root.append(msg);
        }
    };
});