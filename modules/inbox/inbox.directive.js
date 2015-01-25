angular.module('app')
    .directive('list', ['emails', function(emails){
        return {
            restrict: 'AE',
            //templateUrl: 'modules/inbox/list.html',
            link: function(scope, element, attrs){
                emails.getEmails().then(function(response){
                    angular.forEach(response, function(value,key) {
                        scope.sender = response[key].sender;
                        scope.title = response[key].title;
                        scope.content = response[key].content;

                        var shortContent = [];
                        for(var i = 0; i<30; i++) {
                            shortContent += scope.content[i];
                        }

                        element.append('<tr class="new"><td><span class="sender">' + scope.sender + '</span></td> + ' +
                        '<td><span class="title">' +  scope.title  + '</span></td><td><span class="content">' + shortContent  + '</span></td> + ' +
                        '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                    });
                });
            }
        };
    }]);