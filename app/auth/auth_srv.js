'use strict';

angular.module('myApp.auth')

.factory('AuthService', ['$firebase' , '$firebaseAuth', 'AppConfig', function($firebase, $firebaseAuth, AppConfig) {
    var service = {};

    service.ref = new Firebase(AppConfig.fire_baseurl);
    service.auth = $firebaseAuth(service.ref);

    service.isUserAuthenticated = function(){

    };

    return service;
}]);