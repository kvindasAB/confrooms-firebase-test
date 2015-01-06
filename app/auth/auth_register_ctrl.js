'use strict';

angular.module('myApp.auth')

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