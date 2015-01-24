var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/inbox');

    $stateProvider

        .state('inbox', {
            url: '/inbox',
            templateUrl: 'modules/inbox/partial-inbox.html'
        })

        .state('sent', {
            url: '/inbox',
            templateUrl: 'modules/inbox/partial-inbox.html'
        })

        .state('create', {
            url: '/create',
            templateUrl: 'modules/create/partial-email.html'
        })

        .state('view', {
            url: '/view/:emailId',
            templateUrl: 'modules/emailView/partial-view.html'
        })

        .state('config', {
            url: '/config',
            templateUrl: 'modules/config/partial-config.html'
        });

});