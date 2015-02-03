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

    })
    .run(function($rootScope, localStorageService, router){

        var localStorageStates = localStorageService.get('localFolders');
        if (localStorageStates !== null) {
            router.setRoutes(localStorageStates);
        }

    });