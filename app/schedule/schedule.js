'use strict';

angular.module('myApp.schedule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {
    templateUrl: 'schedule/schedule.html',
    controller: 'ScheduleCtrl'
  });
}])


.controller('ScheduleCtrl', ['$scope', function($scope) {

  $scope.timeOptions = {
    hourStep: 1,
    minStep: 0,
    showMeridian: false
  }
  $scope.dateOptions = {
    startingDay: 1
  };

  $scope.dateFormat = 'yyyy/MM/dd';
  $scope.timeFormat = 'HH:mm';

  function initScheduleData (){
    var record =  {
      party: null,
      room: null,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date()
    }
    record.startTime.setMinutes(0);
    record.endTime.setMinutes(0);
    return record;
  }

  $scope.scheduleform = initScheduleData();

  $scope.schedules = [
    {party: "Test Party", room:{name:"room1"}, date: new Date(), startTime:new Date(), endTime: new Date()},
    {party: "Test Party", room:{name:"room1"}, date: new Date(), startTime:new Date(), endTime: new Date()},
  ];

  function resetForm(){
    $scope.scheduleform = initScheduleData();
  };

  function validateSchedule(data){

  };

  function saveSchedule(data){
    $scope.schedules.push(data);
  };

  $scope.onScheduleSubmit = function($event){
    validateSchedule($scope.scheduleform)
    saveSchedule($scope.scheduleform);
    resetForm();
  }

  $scope.open = function($event) {
    console.log("")
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  // Disables previous dates
  $scope.disabled = function(date, mode) {
    return date < new Date();
  };


}]);