angular.module('app')
    .controller('emailView', ['$scope', '$rootScope', 'emails', '$state', function ($scope, $rootScope, emails, $state) {
        emails.getOneEmail($scope.id).then(function(response) {
            var emailToShow = response;
            $scope.title = emailToShow.title;
            $scope.sender = emailToShow.sender;
            $scope.content = emailToShow.content;
        });

        $scope.removeEmail = function() {
            $rootScope.$broadcast('removeEmail');
            $state.go('inbox');
        };
}]);