angular.module('app')
    .directive('list',['emails','localStorageService', function(emails,localStorageService){
        return {
            restrict: 'A',
            //templateUrl: 'modules/inbox/list.html',
            link: function(scope, element, attrs){

                var oldLength = 0;
                var shortContent = function(data,nr) {
                    var shortContent = [];
                    for(var i = 0; i<25; i++) {
                        shortContent += data[nr].content[i];
                    }
                    return shortContent;
                };

                var loadEmails = function(data) {
                    for(var nr=0; nr<data.length; nr++) {
                        var cont = shortContent(data,nr);
                        if (data[nr].read === 'false') {
                            element.append('<tr class="new" id="' + data[nr].id + '"><td><span class="sender">' + data[nr].sender + '</span></td> + ' +
                            '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        } else {
                            element.append('<tr class="new" id="' + data[nr].id + '"><td><span class="sender">' + data[nr].sender + '</span></td> + ' +
                            '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        }
                    }
                };

                scope.emails = localStorageService.get('localEmails');
                // check if local storage is empty
                if (scope.emails === null) {
                    console.log('first http request');
                    emails.getEmails().then(function(response){
                        scope.emails = response.slice().reverse();
                        oldLength = scope.emails.length;
                        localStorageService.add('localEmails',scope.emails);
                        console.log('emails in local storaged saved');
                        loadEmails(scope.emails);
                    });
                } else {
                    console.log('load emails from local storage');
                    loadEmails(scope.emails);
                    oldLength = scope.emails.length;
                }

                scope.$watch(
                    function(scope){
                        if(scope.emails != undefined) {
                            if(scope.emails.length > oldLength ) {
                                var cont = shortContent(scope.emails,0);
                                element.prepend('<tr class="new" id="' + scope.emails[0].id + '"><td><span class="sender">' + scope.emails[0].sender + '</span></td> + ' +
                                '<td><span class="title">' +  scope.emails[0].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                                '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                                console.log('directive: new email added');
                                oldLength = scope.emails.length;
                            }
                        }

                    },
                    function(newValue, oldValue) {

                        //console.log(newValue + ' ' + oldValue);
                    },
                    true
                );


            }
        }
    }]);