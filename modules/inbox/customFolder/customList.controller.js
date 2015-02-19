angular.module('app')
    .controller('customList', ['$scope', '$state', 'customFolders', 'emails',
        function ($scope, $state, customFolders, emails) {

        var currentState = $state.current.name;
        var getEmails = customFolders.getFolders(currentState);

        for(var i=0; i<getEmails.length; i++) {
            emails.getOneEmail(getEmails[i]).then(function(response){
                $scope.emails = response;
                console.log($scope.emails);
            });
        }

    }]);
