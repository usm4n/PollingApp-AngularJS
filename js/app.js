var pollsApp = angular.module('pollsApp', ['ngRoute','angularCharts']);

function pollsAppRouteConfig($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'IndexController',
            templateUrl: 'partials/list.html'
        }).
        when('/view/:id', {
            controller: 'PollController',
            templateUrl: 'partials/poll.html'
        }).
        when('/view/:id/stats', {
            controller: 'StatsController',
            templateUrl: 'partials/stats.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}
pollsApp.config(pollsAppRouteConfig);