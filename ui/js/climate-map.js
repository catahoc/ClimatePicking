define(["server", "jquery", "jquery-ui", "maps", "climate-colors"],
    function (server, $, _, maps, colors) {
        return {
            load: function () {
                let monthPicker = $('#monthPicker');
                let map = maps.createMap('map');
                let rebound = function () {
                    server.requestCities(map.getBounds(), monthPicker.val(), function (cities) {
                        map.setMarks(cities.map(x => maps.createMark(x.latlon, x.name, colors.pickColor(x.temp), x.temp)), false);
                    });
                };
                monthPicker.change(rebound);
                map.boundsChange(rebound);
                rebound();
            }
        };
    });