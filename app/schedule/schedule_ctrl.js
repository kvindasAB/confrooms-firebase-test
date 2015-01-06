'use strict';

angular.module('myApp.schedule')

.controller('ScheduleCtrl', ['currentAuth', '$scope', 'ScheduleService', function(currentAuth, $scope, ScheduleService) {

  $scope.isTimeSelectionValid = false;
  $scope.dateFormat = 'yyyy/MM/dd';
  $scope.timeFormat = 'HH:mm';
  $scope.timeOptions = {
    hourStep: 1,
    minStep: 0,
    showMeridian: false
  }
  $scope.dateOptions = {
    startingDay: 1
  };

  $scope.rooms = ScheduleService.rooms;

  function initScheduleData (){
    var record =  {
      party: null,
      room: null,
      date: null,
      startTime: new Date(),
      endTime: new Date()
    }
    record.startTime.setMinutes(0);
    record.endTime.setMinutes(0);
    record.serializeFire = function() {
      var serialized = {
        party: record.party,
        room: record.room,
        date: record.date.getTime(),
        startTime: record.startTime.getTime(),
        endTime: record.endTime.getTime()
      }
      return serialized;
    }

    return record;
  }

  $scope.scheduleform = initScheduleData();

  $scope.schedules = ScheduleService.reserves;

  function resetForm(){
    $scope.scheduleform = initScheduleData();
  };

  function saveSchedule(data){
    $scope.schedules.$add(data.serializeFire());
  };

  $scope.onScheduleSubmit = function($event){
    saveSchedule($scope.scheduleform);
    resetForm();
  }

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  // Disables previous dates
  $scope.disabled = function(date, mode) {
    var ref = new Date();
    ref.setHours(0);
    ref.setMinutes(0);
    ref.setSeconds(0)
    return date < date;
  };

  function deserializeSchedule(data){
    data.dateObj = data.dateObj ? data.dateObj : new Date(data.date);
    data.startTimeObj = data.startTimeObj ? data.startTimeObj : new Date(data.startTime);
    data.endTimeObj = data.endTimeObj ? data.endTimeObj : new Date(data.endTime);
  }

  function isDateEqual(date1, date2){
    return date1.getDate() === date2.getDate()
      && date1.getMonth() === date2.getMonth()
      && date1.getFullYear() === date2.getFullYear();
  }

  function validateReserve(newReserve, existingReserves){
    if(!newReserve.date || !newReserve.startTime || !newReserve.endTime){
      return false;
    }
    if(newReserve.endTime <= newReserve.startTime){
      return false;
    }
    for(var i = 0; i < existingReserves.length; i++){
      var reserve = existingReserves[i];
      deserializeSchedule(reserve);
      if(newReserve.room !== reserve.room){
        continue;
      }
      if(!isDateEqual(reserve.dateObj, newReserve.date)){
        continue;
      }
      if(newReserve.startTime <= reserve.endTimeObj && reserve.startTimeObj <=  newReserve.endTime){
        return false;
      }
    }
    return true;
  }


  $scope.validateScheduleForm = function() {
    $scope.isTimeSelectionValid = validateReserve($scope.scheduleform, $scope.schedules);
  }

  $scope.onRoomChanged = function(){
    $scope.validateScheduleForm();
  };

  $scope.onDateChanged = function(){
    $scope.validateScheduleForm();
  };

  $scope.onTimeChanged = function(){
    $scope.validateScheduleForm();
  };

}]);