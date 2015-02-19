angular.module('app')
    .controller('sentCtrl', ['$scope', '$rootScope', 'localStorageService', 'sent', function ($scope, $rootScope, localStorageService, sent) {
        var sentList = []; // list of emails from request

        $scope.sent = localStorageService.get('sentEmails'); // check if local storage has emails

        if ($scope.sent === null) { // local storage has no emails
            console.log('http required');
            sent.getSentEmails().then(function(response){ // get emails
                $scope.sent = reverse(response); // save emails to scope
                sentList = response;
                localStorageService.add('sentEmails',$scope.sent); // save emails to localstorage
            });
        } else { //local storage has emails
            console.log('On local storage. Nothing do be done.');
        }

        // reverse emails; the first email is the newest
        var reverse = function(items) {
            return items.slice().reverse();
        };

        var addEmail = function(elem) {
            $scope.sent.unshift(elem); // add to the beginning of an array
            console.log('new email added');
            localStorageService.add('sentEmails', $scope.sent);
        };

        var getScope = function(id){
            for(var i=0; i<$scope.sent.length; i++) {
                var s = $scope.sent[i].id;
                if(s === id) {
                    return i;
                }
            }
        };

        $scope.showSentEmail = function(id) {
            $scope.emailToShow = id;
            $scope.go(id);
            $rootScope.$broadcast('sentId',id);
        };
    }]);