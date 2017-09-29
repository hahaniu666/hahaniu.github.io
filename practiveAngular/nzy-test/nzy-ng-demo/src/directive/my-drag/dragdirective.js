(function () {
    "use strict"
    var convertFirstUpperCase = function (str) {
        return str.replace(/(\w)/, function (s) {
            return s.toUpperCase();
        });
    }
    angular.module("myApp", []);
    var myApp = angular.module("myApp"),
        rubyDragEventDirectives = {};
    angular.forEach("dragstart drag dragenter dragover drop dragleave dragend".split(' '), function (eventName) {
        var rubyEventName = 'ruby' + convertFirstUpperCase(eventName);
        rubyDragEventDirectives[rubyEventName] = ['$parse', function ($parse) {
            //$parse 语句解析器
            return {
                restrict: 'A',
                compile: function (ele, attr) {
                    var fn = $parse(attr[rubyEventName]);
                    return function rubyEventHandler(scope, ele) {
                        ele[0].addEventListener(eventName, function (event) {
                            if (eventName == 'dragover' || eventName == 'drop') {
                                event.preventDefault();
                            }
                            var callback = function () {
                                fn(scope, {event: event});
                            };
                            callback();
                        });
                    }
                }
            }
        }]
    });
    myApp.directive(rubyDragEventDirectives);
})();