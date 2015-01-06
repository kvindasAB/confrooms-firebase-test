'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'ui.bootstrap',
  'myApp.auth',
  'myApp.schedule',
  'myApp.version'
])

  .constant("AppConfig",
  {
    fire_baseurl: "https://scheduleappab.firebaseio.com",
    fire_roomsurl: "https://scheduleappab.firebaseio.com/rooms",
    fire_reservesurl: "https://scheduleappab.firebaseio.com/reserves"
  })

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
