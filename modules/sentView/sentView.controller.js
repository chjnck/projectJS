angular.module('app')
    .controller('sentView', ['$scope', '$rootScope', 'sent', '$state', function ($scope, $rootScope, sent, $state) {
        sent.getOneSentEmail($scope.id).then(function(response) {
            var emailToShow = response;
            $scope.title = emailToShow.title;
            $scope.rec = prettyReceivers(emailToShow.receivers);
            $scope.content = emailToShow.content;
        });


        // nice looking string about receivers
        var prettyReceivers = function(receivers) {
            if (receivers.length === 0) {
                return "None";
            }
            if (receivers.length === 1) {
                return receivers[0];
            }
            var returnString = "";
            for(var i = 0; i<receivers.length-1; i++) {
                returnString += receivers[i] + "; ";
            }
            returnString += receivers[receivers.length - 2];
            return returnString;
        };

        $scope.back = function() {
            $state.go('sent');
        };
}]);