angular.module('app')
    .controller('customList', function ($scope, $rootScope, $state, customFolders, emails, localStorageService) {

        $scope.currentState = $state.current.name; // name of view
        var allEmails = localStorageService.get('folders'); // get all emails from subfolders
        var idEmails = [];

        // get id emails which belong to this subfolder
        for(var i = 0; i<allEmails.length; i++) {
            if ($scope.currentState === allEmails[i].name) {
                idEmails.unshift(allEmails[i].id);
            }
        }

        // get emails by id from server
        for(var j=0; j<idEmails.length; j++) {
            emails.getOneEmail(idEmails[j]).then(function(response){
                $scope.emailsList = response;
                $rootScope.$broadcast('addEmailsSub',$scope.emailsList);
            });
        }

        $scope.go = function (id) {
            $state.go('view', {emailId: id});
        };

        $scope.showEmail = function(id) {
            console.log('show email ' + id);
            $scope.go(id);
        };

        $scope.removeEmail = function(id,folder) {
            customFolders.deleteFolder(id,folder);
        };

    });
