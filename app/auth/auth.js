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

}])

.factory('AuthService', ['$firebase' , '$firebaseAuth', 'AppConfig', function($firebase, $firebaseAuth, AppConfig) {
    var service = {};

    service.ref = new Firebase(AppConfig.fire_baseurl);
    service.auth = $firebaseAuth(service.ref);

    return service;
}])

.controller('LoginCtrl', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {

    console.log($scope);

    $scope.loginform = {
      username: "",
      password: ""
    }

    function login(username, password) {
      AuthService.auth.$authWithPassword({
        email    : username,
        password : password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path("/schedule");
      }).catch(function(error) {
        console.error("Authentication failed: ", error);
      });
    }

    function resetForm() {
      $scope.loginform.username = "";
      $scope.loginform.password = "";
    }

    $scope.onSaveClicked = function(){
      console.log("onSaveClicked");
      login($scope.loginform.username, $scope.loginform.password);
    }

    $scope.onCancelClicked = function(){
      console.log("onCancelClicked");
      resetForm();
    }

}])

.controller('RegisterCtrl', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {

  console.log($scope);

  $scope.registerform = {
    username: "",
    password: ""
  }

  function register(username, password) {
    AuthService.auth.$createUser(username, password)
    .then(function(authData) {
      // Implement automatic login
      $location.path("/login");
    }).catch(function(error) {
      console.error("Authentication failed: ", error);
    });
  }

  function resetForm() {
    $scope.registerform.username = "";
    $scope.registerform.password = "";
  }

  $scope.onSaveClicked = function(){
    console.log("onSaveClicked");
    register($scope.registerform.username, $scope.registerform.password);
  }

  $scope.onCancelClicked = function(){
    console.log("onCancelClicked");
    resetForm();
  }

}]);