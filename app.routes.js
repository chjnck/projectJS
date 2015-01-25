angular.module('app')

    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/inbox');

    $stateProvider

        .state('inbox', {
            url: '/inbox',
            templateUrl: 'modules/inbox/inbox.html'
        })

        .state('create', {
            url: '/create',
            templateUrl: 'modules/create/email.html'
        })

        .state('view', {
            url: '/view/:emailId',
            templateUrl: 'modules/emailView/view.html'
        })

        .state('config', {
            url: '/config',
            templateUrl: 'modules/config/config.html'
        });

});