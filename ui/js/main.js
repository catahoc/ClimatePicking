/**
 * Created by Freddy on 21.11.2016.
 */
require.config({
    paths: {
        'jquery': 'util/jquery',
        'jquery-ui': 'util/jquery-ui',
        'ymaps': '//api-maps.yandex.ru/2.1/?lang=ru-RU'
    },
    urlArgs: "bust=" + (new Date()).getTime(),

    shim: {
        jquery: {
            exports: "$"
        },
        ymaps: {
            exports: 'ymaps'
        }
    }

});

requirejs(["jquery", "loader", "modules"], function ($, loader, modules) {
    loader.then(function(){
        let loading = $('#loading');
        loading.hide();
        let menu = $('#menu');
        let content = $('#content');
        let loadingModule = undefined;
        $.each(modules, function(_, module){
            $('<span class="menu-item">').appendTo(menu).html(module.name).click(() => {
                loading.show();
                content.hide();
                if(loadingModule != undefined){
                    loadingModule.interrupt = true;
                }
                content.html('<img src="img/loading.gif"/>');
                module.load(content).then(() => {
                    loading.hide();
                    content.show();
                });
                loadingModule = module;
            });
        });
    });
});