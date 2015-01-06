'use strict';

angular.module('myApp.schedule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {
    templateUrl: 'schedule/schedule.html',
    controller: 'ScheduleCtrl',
    resolve: {
      "currentAuth": ["AuthService", function(AuthService) {
        return AuthService.auth.$requireAuth();
      }]
    }
  });
}]);