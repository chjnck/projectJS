angular.module('app')
    .controller('emailsCtrl', ['$scope', '$rootScope', 'localStorageService', 'emails', function ($scope, $rootScope, localStorageService, emails) {
        $scope.emails = localStorageService.get('localEmails');
        $scope.source = 'Local';
        if ($scope.emails === null) {
            console.log('http required');
            emails.getEmails().then(function(response){
                console.log('w srodku');
                $scope.emails = response;
                $rootScope.$broadcast('recivedEmails',$scope.emails);
                localStorageService.add('localEmails',$scope.emails);
                $scope.source = 'Online';
            });
        } else {
            console.log('On local storage. Nothing do be done.');
        }
    }]);