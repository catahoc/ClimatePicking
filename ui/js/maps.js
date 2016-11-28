/**
 * Created by Freddy on 28.11.2016.
 */
define(["ymaps"], function (ymaps, id) {
    return {
        promise: new Promise(function(resolve){
            ymaps.ready(resolve);
        }),
        createMark: function(latlon, name, color){
            return new ymaps.Placemark(latlon, {
                hintContent: name
            }, {
                iconColor: color });
        },
        createMap: function(id){
            let map = new ymaps.Map(id, {
                center: [55.76, 37.64],
                zoom:2
            });

            return {
                setMarks: function(arrayOfMarks, adjustMap){
                    map.geoObjects.removeAll();

                    let marks = new ymaps.GeoObjectCollection(null);
                    arrayOfMarks.forEach(x => marks.add(x));
                    map.geoObjects.add(marks);
                    if(adjustMap){
                        map.setBounds(marks.getBounds());
                    }
                },
                boundsChange: function(callback){
                    map.events.add('boundschange', function(event){
                        callback(event.get('newBounds'));
                    });
                }
            }
        }
    };
});