angular.module('app')

    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/inbox');

    $stateProvider
        .state('inbox', {
            url: '/inbox',
            templateUrl: 'modules/inbox/inbox.html',
            controller: function($scope, $state, $stateParams) {
                $scope.params = $stateParams;
                $scope.go = function (id) {
                    $state.go('view', {emailId: id});
                };
            }
        })

        .state('create', {
            url: '/create',
            templateUrl: 'modules/create/email.html'
        })

        .state('view', {
            url: '/view/{emailId}',
            params: {
                emailId: null
            },
            templateUrl: 'modules/emailView/emailView.html',
            controller: function($scope, $stateParams) {
                $scope.id = $stateParams.emailId;
            }
        })

        .state('config', {
            url: '/config',
            templateUrl: 'modules/config/config.html'
        });

      /*  var populateStates = function () {
            state.getStates().then(function(response){
                angular.forEach(response, function(item) {
                    $stateProvider.state(item[0], item[1]);
                });
            });
        };

       /*
       .factory('state', ['$http', function ($http) {
       var states = ['inbox.folder', {
       url: '/inbox/folder',
       templateUrl: 'modules/create/email.html'
       }];

       return {
       getStates: function () {
       return states;
       }
       }
       }]);
       */

    });