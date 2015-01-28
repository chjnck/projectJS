angular.module('app')
    .controller('emailsCtrl', ['$scope', '$rootScope', 'localStorageService', 'emails', function ($scope, $rootScope, localStorageService, emails) {
        var emailsList = []; // list of emails from request

        var reverse = function(items) {
            return items.slice().reverse();
        };

       /* var localStorage = function() {
            $scope.emails = localStorageService.get('localEmails');
            $scope.source = 'Local';
            if ($scope.emails === null) {
                console.log('http required');
                emails.getEmails().then(function(response){
                    $scope.emails = reverse(response);
                    emailsList = response;
                    localStorageService.add('localEmails',$scope.emails);
                    $scope.source = 'Online';
                });
            } else {
                console.log('On local storage. Nothing do be done.');
            }
        }; */

        var load = function() {
            $scope.emails = localStorageService.get('localEmails');
            emails.getEmails().then(function(response) {
                    emailsList = response;
                    var newLength = emailsList.length;
                    var oldLength = $scope.emails.length;
                    if (newLength > oldLength) { // check new emails
                        var diff = newLength - oldLength; // amount of new emails
                        for(var i=1; i<=diff; i++) { // for more new emails
                            addEmail(emailsList[newLength-i],diff);
                        }
                    }
            });
        };

        var addEmail = function(elem, times) {
            $scope.emails.unshift(elem); // add to the beginning of an array
            console.log('new email added');
            console.log($scope.emails[0].sender);
            localStorageService.add('localEmails', $scope.emails);
        };

        $scope.showEmail = function() {
            console.log('show email');
        };

        $scope.removeEmail = function() {
            console.log('email removed');
           // $scope.items.splice($scope.items.indexOf(item),1);
           // $scope.emails.splice(index,1);

        };

        $scope.updateStorage = function(input) {
            for(var i=0; i<$scope.emails.length; i++) {
                if(input === $scope.emails[i].id) {
                    $scope.emails[i].read = 'true';
                    localStorageService.add('localEmails', $scope.emails);
                }
            }
        };

        //localStorage(); // load data from localStorage at first
        setInterval(load,5000); // every 5 sec

    }]);