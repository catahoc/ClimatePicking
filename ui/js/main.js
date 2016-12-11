/**
 * Created by Freddy on 21.11.2016.
 */
require.config({
    paths: {
        'jquery': 'util/jquery',
        'jquery-ui': 'util/jquery-ui',
        'ymaps': '//api-maps.yandex.ru/2.1/?lang=ru-RU',
        'bootstrap': 'util/bootstrap'
    },
    urlArgs: "bust=" + (new Date()).getTime(),

    shim: {
        "ymaps": {
            exports: 'ymaps'
        },
        "bootstrap" : { "deps" :['jquery'] }
    }

});

requirejs(["jquery", "loader", "modules", "bootstrap", "url-utils"], function ($, loader, modules, _, urlUtils) {
    loader.then(function(){
        let loading = $('#loading');
        loading.hide();
        let menu = $('#menu');
        let content = $('#content');
        let loadingModule = undefined;
        let args = urlUtils.getUrl();
        $.each(modules, function(_, module){
            let li = $('<li/>').appendTo(menu);
            $('<a href="javascript:;"/>').appendTo(li).html(module.name).click(() => {
                li.addClass('active').siblings().removeClass('active');
                loading.show();
                content.hide();
                if(loadingModule != undefined){
                    loadingModule.interrupt = true;
                }
                content.html('<img src="img/loading.gif"/>');
                args = {module: module.name};
                urlUtils.setUrl(args);
                module.load(content, args).then(() => {
                    loading.hide();
                    content.show();
                });
                loadingModule = module;
            });
            if(args.module == module.name){
                li.addClass('active');
                module.load(content, args);
            }
        });
    });
});