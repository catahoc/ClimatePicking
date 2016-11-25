/**
 * Created by Freddy on 26.11.2016.
 */
define(function () {
    return {
        pad: function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
    };
});