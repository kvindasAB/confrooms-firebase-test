'use strict';

angular.module('myApp.auth', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'auth/login.html',
    controller: 'LoginCtrl'
  });
}])

.factory('AuthService', ['$firebase' , '$firebaseAuth', 'AppConfig', function($firebase, $firebaseAuth, AppConfig) {
    var service = {};

    service.ref = new Firebase(AppConfig.firebaseurl);
    service.auth = $firebaseAuth(service.ref);

    return service;
}])

.controller('LoginCtrl', ['AuthService', function(AuthService) {



}]);