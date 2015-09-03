var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Company',
      templateUrl: 'partials/compnies.html',
      controller: 'companiesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    