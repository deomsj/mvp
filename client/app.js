var gym = angular.module('gym', []);

gym.controller('PracticeController', function($scope) {

  $scope.update = function(){
    $scope.points = $scope.points || 0;
    $scope.a = Math.ceil(Math.random() * 100);
    $scope.b = Math.ceil(Math.random() * 100);
    $scope.answer = $scope.a + $scope.b;
  };

  $scope.checkAnswer = function() {
    if($scope.answer === +$scope.attempt){
      $scope.display = 'Correct!';
      $scope.points++;
      $scope.update();
    } else{
      $scope.display = 'Wrong!';
    }
    $scope.attempt = '';
  };

  $scope.update();

});