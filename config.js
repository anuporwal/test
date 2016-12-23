app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('test', {
            url: '/test',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        });
    $stateProvider
        .state('results', {
            url: '/results',
            templateUrl: 'templates/results.html',
            controller: 'resultsCtrl'
        });

    $urlRouterProvider.otherwise('/test');
}]);