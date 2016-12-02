define(["jquery", "maps"], function($, maps){
    let jqueryPromise = new Promise(function(resolve){
        $(resolve);
    });
    return {
        then: function(callback){
            Promise.all([jqueryPromise, maps.promise]).then(callback);
        }
    }
});