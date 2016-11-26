/**
 * Created by Freddy on 26.11.2016.
 */
define(["math"], function (math) {
    var anchors = [
        [70, [255, 0, 0]],
        [30, [255, 0x84, 0]],
        [15, [255, 0xFB, 0]],
        [0, [0, 0xFB, 0xFF]],
        [-15, [0, 0x6E, 0xFF]],
        [-90, [0x09, 0x1F, 0x3B]]
    ];
    return {
        pickColor: function(temp){
            var lastVal;
            var lastArr;
            var notFoundColor = '#000000';
            for(var i =0; i < anchors.length; ++i){
                var curVal = anchors[i][0];
                if(temp > curVal){
                    if(lastVal == undefined){
                        return notFoundColor;
                    }

                    var curArr = anchors[i][1];
                    var fullDiff = lastVal-curVal;
                    var partOfCur = (lastVal-temp)/fullDiff;
                    var partOfLast = (temp-curVal)/fullDiff;
                    var parts = [
                        math.pad(Math.round(lastArr[0]*partOfLast+curArr[0]*partOfCur).toString(16), 2),
                        math.pad(Math.round(lastArr[1]*partOfLast+curArr[1]*partOfCur).toString(16), 2),
                        math.pad(Math.round(lastArr[2]*partOfLast+curArr[2]*partOfCur).toString(16), 2)
                    ];
                    return '#'+parts[0]+parts[1].toString(16)+parts[2].toString(16)
                }
                else{
                    lastVal = curVal;
                    lastArr = anchors[i][1];
                }
            }
            return notFoundColor;
        }
    };
});