var gym = angular.module('gym', []);

// gym.config(function(){

// });

// gym.run(function(){

// });

gym.controller('PracticeController', function($scope) {
  $scope.a = Math.ceil(Math.random() * 100);
  $scope.b = Math.ceil(Math.random() * 100);
});