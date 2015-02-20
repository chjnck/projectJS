angular.module('app')
    .directive('recList', function($rootScope){
        return {
            restrict: 'A',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){

                var model = element.attr('ng-model');

                scope.$parent.$watch(model, function(value) {
                    clearList();
                    for(var nr=0; nr<value.length; nr++) {
                        element.append('<tr draggable="true"><td><span class="sender">' + value[nr] + '</span></td></tr>');
                    }
                    scope.$parent.formName.recList.$setValidity('atleastone', value.length > 0);
                }, true);

                element.bind('click',function(event){
                    var tr = closest(event.target, 'tr');
                    var mailToRemove = tr.childNodes[0].childNodes[0].innerHTML;
                    scope.$parent.removeEmail(mailToRemove);
                    removeEmail(tr);
                });

                var clearList = function() {
                    while (element[0].hasChildNodes()) {
                        element[0].removeChild(element[0].childNodes[0]); 
                    }
                };

                var removeEmail = function(mail) {
                    mail.remove();
                };

                var closest = function(elem, selector) {
                    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
                    while (elem) {
                        if (matchesSelector.bind(elem)(selector)) {
                            return elem;
                        } else {
                            elem = elem.parentElement;
                        }
                    }
                    return false;
                };

            }
        };
    })
    .directive('zerolength', function(){
        return {
            restrict: 'A',
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.zerolength = function(modelValue) {
                    if ( !modelValue ) {
                        return false;
                    }
                    return true;
                };
            }
        };
    })
    .directive('validemail', function(){
        return {
            restrict: 'A',
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.validemail = function(modelValue) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if ( !re.test(modelValue)) {
                        return false;
                    }
                    return true;
                };
            }
        };
    })
    .directive('checkifexist', function(){
        return {
            restrict: 'A',
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.checkifexist = function(modelValue) {
                    if (scope.checkEmail(modelValue)) {
                       return false;
                    }
                    return true;
                };
            }
        };
    });