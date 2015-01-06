'use strict';

angular.module('myApp.auth', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'auth/login.html',
    controller: 'LoginCtrl'
  })
    .when('/register', {
      templateUrl: 'auth/register.html',
      controller: 'RegisterCtrl'
    });

}]);