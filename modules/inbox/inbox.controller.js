angular.module('app')
    .controller('emailsCtrl', ['$scope', '$rootScope', 'localStorageService', 'emails', function ($scope, $rootScope, localStorageService, emails) {
        var emailsList = []; // list of emails from request

        $scope.emails = localStorageService.get('localEmails'); // check if local storage has emails

        if ($scope.emails === null) { // local storage has no emails
            console.log('http required');
            emails.getEmails().then(function(response){ // get emails
                $scope.emails = reverse(response); // save emails to scope
                emailsList = response;
                localStorageService.add('localEmails',$scope.emails); // save emails to localstorage
            });
        } else { //local storage has emails
            console.log('On local storage. Nothing do be done.');
        }

        // reverse emails; the first email is the newest
        var reverse = function(items) {
            return items.slice().reverse();
        };

        var load = function() {
            // $scope.emails = localStorageService.get('localEmails');
            emails.getEmails().then(function(response) {
                emailsList = response;
                var newLength = emailsList.length;
                var oldLength = $scope.emails.length;
                if (newLength > oldLength) { // check new emails
                    var diff = newLength - oldLength; // amount of new emails
                    for(var i=1; i<=diff; i++) { // for more new emails
                        addEmail(emailsList[newLength-i]);
                    }
                }
            });
        };

        var addEmail = function(elem) {
            $scope.emails.unshift(elem); // add to the beginning of an array
            console.log('new email added');
            localStorageService.add('localEmails', $scope.emails);
        };


        var getScope = function(id){
            for(var i=0; i<$scope.emails.length; i++) {
                var s = $scope.emails[i].id;
                if(s === id) {
                    return i;
                }
            }
        };

        $scope.removeEmail = function(id) {
            emails.deleteEmails(id).then(function(response) {
                console.log(response);
            });
            var nr = getScope(id);
            $scope.emails.splice(nr,1);
            localStorageService.add('localEmails',$scope.emails);
        };


        $scope.updateStorage = function(id) {
            var nr = getScope(id);
            if ($scope.emails[nr].read === false){
                $scope.emails[nr].read = true;
                localStorageService.add('localEmails', $scope.emails);
            }

            var json = { read: true };
            emails.update(id,json).then(function(response) {
            });
        };

        $scope.showEmail = function(id) {
            console.log('show email');
            $scope.emailToShow = id;
            $scope.go(id);
            $rootScope.$broadcast('emailId',id);
        };

        $rootScope.$on('removeEmail', function(){
            $scope.removeEmail($scope.emailToShow);
        });

        setInterval(load,7000); // every 7 sec

    }]);