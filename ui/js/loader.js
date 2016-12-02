define(["jquery", "maps", "jquery-ui"], function($, maps, _){
    let jqueryPromise = new Promise(function(resolve){
        $(resolve);
    });
    return {
        then: function(callback){
            Promise.all([jqueryPromise, maps.promise]).then(callback);
        }
    }
});