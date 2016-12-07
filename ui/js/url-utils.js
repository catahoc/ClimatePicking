/**
 * Created by Freddy on 08.12.2016.
 */
define(function(){
   return {
       getUrl: function () {
           let map = {};
           if (document.location.toString().indexOf('?') !== -1) {
               let query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string (thanks, @vrijdenker)
                   .replace(/#.*$/, '')
                   .split('&');

               for (let i = 0, l = query.length; i < l; i++) {
                   let aux = decodeURIComponent(query[i]).split('=');
                   map[aux[0]] = aux[1];
               }
           }
           return map;
       },
       setUrl: function (map) {
           let loc = document.location.toString();
           let haveArgs = loc.indexOf('?') !== -1;

           let beforeArgs = haveArgs ? loc.substring(0, loc.indexOf('?') + 1) : loc + '?';
           let args = [];
           for(var key in map){
                args.push(key + '=' + map[key]);
           }
           let newLoc = beforeArgs + args.join('&');
           window.history.pushState(loc, "Title", newLoc);
       }
   };
});