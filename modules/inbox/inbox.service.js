angular.module('app')
    .factory('emails', ['$http', '$rootScope', function ($http, $rootScope) {
        var emails = [];
        return {
            getEmails: function() {
                return $http.get('/emails').then(function(response) {
                    emails = response.data;
                    $rootScope.$broadcast('recivedEmails',emails);
                    return emails;
                });
            }
        };
}]);




/*angular.module('app')
    .factory('emails', ['$http', function ($http) {
 emails.get = function(callback) {
 if (!emails) {
 return $http.get('/emails').then(function(response) {
 emails = response.data;
 $rootScope.$broadcast('recivedEmails',emails);
 return emails;
 }).then(callback)
 } else {
 }
 };

 return emails;
    }]);
*/