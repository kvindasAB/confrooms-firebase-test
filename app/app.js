'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.auth',
  'myApp.schedule',
  'myApp.version'
])

  .constant("AppConfig",
  {
    firebaseurl: "https://scorching-fire-2836.firebaseio.com"
  })

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
