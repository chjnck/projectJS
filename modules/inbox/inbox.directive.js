angular.module('app')
    .directive('list', function($compile){
        return {
            restrict: 'A',
            templateUrl: 'modules/inbox/list.html',
            link: function(scope, element, attrs){
                scope.$watch(
                    function(scope){
                        /*angular.forEach(scope.$eval(attrs.list),function(a){
                            var child = scope.$new();
                        });*/
                        //return scope.$eval(attrs.list);
                    },
                    function(value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);

                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    }
                );
            }

            /*
             var content = element.children();
             for (var i=0; i<$scope.emails.length; i++) {
             element.append(content.clone());
             } */

            /*
             for (var key in $scope.emails) {
             var shortContent = [];
             for(var i = 0; i<30; i++) {
             shortContent += $scope.emails[key].content[i];
             };

             element.append('<tr class="new"><td><span class="sender">' + $scope.emails[key].sender + '</span></td> + ' +
             '<td><span class="title">' +  $scope.emails[key].title  + '</span></td><td><span class="content">' + shortContent  + '</span></td> + ' +
             '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
             }*/


            /*
             transclude: 'element',
             compile: function(el, attr, linker) {
             return function(scope, $element, $attr) {
             angular.forEach(scope.$eval($attr.list).reverse(),function(a){
             var child = scope.$new();
             child[attr.binding] = a;
             linker(child, function(clone){
             $element.after(clone);
             })
             })
             }
             }
             */
        }
    });