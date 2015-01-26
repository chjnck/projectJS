angular.module('app')
    .controller('emailsCtrl', ['$scope', '$rootScope', 'localStorageService', 'emails', function ($scope, $rootScope, localStorageService, emails) {
        var emailsList = {};

        var sortEmails = function(data) {

        };

        var length = 0;
        var localStorage = function() {
            $scope.emails = localStorageService.get('localEmails');
            $scope.source = 'Local';
            if ($scope.emails === null) {
                console.log('http required');
                emails.getEmails().then(function(response){
                    $scope.emails = response;
                    //$rootScope.$broadcast('recivedEmails',$scope.emails);
                    localStorageService.add('localEmails',$scope.emails);
                    length = $scope.emails.length;
                    $scope.source = 'Online';
                });
            } else {
                console.log('On local storage. Nothing do be done.');
            }
        };


        var load = function() {
            emails.getEmails().then(function(response) {
                    $scope.emails = response;
                    console.log($scope.emails[1].received);
                    var newLength = $scope.emails.length;
                    if (newLength > length) {

                    }
            });
        };

        localStorage(); // load data from localStorage
        setInterval(load,5000); // every 5 sec

    }]);
