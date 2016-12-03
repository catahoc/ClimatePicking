/**
 * Created by Freddy on 02.12.2016.
 */
define(["jquery"], function($){
    let module = {
        init: function(page, moduleName, name){
            return {
                page: page,
                moduleName: moduleName,
                name: name,
                loaded: false,
                interrupt: false,
                load: function(content){
                    let moduleCopy = this;
                    let loadHtml = new Promise(resolve => $.get(this.page, loaded => resolve(loaded)));
                    let loadModule = new Promise(resolve => require([this.moduleName], resolve));
                    this.interrupt = false;
                    let setup = function(){
                        content.html(moduleCopy.html);
                        moduleCopy.moduleObject.load();
                    };
                    return new Promise(resolve => {
                        if(!this.loaded){
                            Promise.all([loadHtml, loadModule]).then(function(data){
                                moduleCopy.html = data[0];
                                moduleCopy.moduleObject = data[1];
                                moduleCopy.loaded = true;
                                if(!moduleCopy.interrupt){
                                    setup();
                                    resolve();
                                }
                            });
                        }
                        else {
                            setup();
                            resolve();
                        }
                    });
                }
            }
        }
    };
    return [
        module.init("city-comparer.htm", "city-comparer", "City Comparer"),
        module.init("city-picker.htm", "city-picker", "City Picker"),
        module.init("climate-map.htm", "climate-map", "Climate Map")
    ];
});