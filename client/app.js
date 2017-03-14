var gym = angular.module('gym', []);

gym.controller('SimpleAdditionController', function($scope) {

  $scope.update = function(){
    $scope.points = $scope.points || 0;
    $scope.a = Math.ceil(Math.random() * 100);
    $scope.b = Math.ceil(Math.random() * 100);
    $scope.answer = $scope.a + $scope.b;
  };

  $scope.checkAnswer = function() {
    if($scope.answer === +$scope.attempt){
      $scope.display = 'Woohoo!!! Great Mathing!!!';
      $scope.points++;
      $scope.update();
    } else{
      $scope.display = 'try again, you can do it!';
    }
    $scope.attempt = '';
  };

  $scope.update();

});