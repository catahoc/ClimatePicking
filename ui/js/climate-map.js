define(["server", "jquery", "jquery-ui", "maps", "climate-colors", "url-utils"],
    function (server, $, _, maps, colors, urlUtils) {
        return {
            load: function (args) {
                let boundsToString = function(bounds){
                    return bounds[0][0] + "," + bounds[0][1] + "," + bounds[1][0] + "," + bounds[1][1];
                };
                let stringToBounds = function(string){
                    let splitted = string.split(',');
                    return [[splitted[0],splitted[1]], [splitted[2],splitted[3]]];
                };
                let monthPicker = $('#monthPicker');
                let map = maps.createMap('map');
                let rebound = function () {
                    args.month = monthPicker.val();
                    var bounds = map.getBounds();
                    args.bounds = boundsToString(bounds);
                    urlUtils.setUrl(args);
                    server.requestCities(bounds, args.month, function (cities) {
                        map.setMarks(cities.map(x => maps.createMark(x.latlon, x.name, colors.pickColor(x.temp), x.temp)), false);
                    });
                };
                if(args.month){
                    monthPicker.val(args.month);
                }
                if(args.bounds){
                    var bounds = stringToBounds(args.bounds);
                    map.setBounds(bounds);
                }
                monthPicker.change(rebound);
                map.boundsChange(rebound);
                rebound();
            }
        };
    });