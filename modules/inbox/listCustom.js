angular.module('app')
    .directive('listCustom', function($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                // drag and drop
              /*  element.bind("drop", function(e) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }

                    var id = event.dataTransfer.getData('text');
                    console.log('jupjup' + id);

                    return false;
                });
                */

            }
        };
    });