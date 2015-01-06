'use strict';

angular.module('myApp.auth')

.controller('LoginCtrl', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {

    $scope.loginform = {
      username: "",
      password: ""
    };

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
      login($scope.loginform.username, $scope.loginform.password);
    };

    $scope.onCancelClicked = function(){
      resetForm();
    };

}]);

