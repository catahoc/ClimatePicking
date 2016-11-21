/**
 * Created by Freddy on 21.11.2016.
 */
require.config({
    paths: {
        'jquery': 'util/jquery'
    },

    shim: {
        jquery: {
            exports: "$"
        }
    }

});

requirejs(["jquery", "server", "renderer"], function($, server, renderer) {
    $(function(){
        renderer.renderWaiting();
        server.getCities(function(cities){
            renderer.renderCities(cities);
        }, function(ex){
            renderer.renderError(ex);
        });
        // server.compareTemp(function(baseCity, quotedCity){
        //     renderer.renderCities();
        // });
    });
});