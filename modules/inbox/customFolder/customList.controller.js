angular.module('app')
    .controller('customList', ['$scope', '$state', 'customFolders', 'emails', 'localStorageService',
        function ($scope, $state, customFolders, emails, localStorageService) {

            var currentState = $state.current.name;
            var getEmailsId = customFolders.getFolders(currentState);
            var emailsList = [];

            for(var i=0; i<getEmailsId.length; i++) {
                emails.getOneEmail(getEmailsId[i]).then(function(response){
                    $scope.emails = response;
                    emailsList.push(response);
                    console.log(emailsList);
                });
            }

    }]);
