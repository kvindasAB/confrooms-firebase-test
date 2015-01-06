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
  }])

  .run(["$rootScope", "$location", function($rootScope, $location) {
      $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
  }]);

