var gym = angular.module('gym', []);

gym.controller('SimpleAdditionController', function($scope) {

  $scope.update = function(){
    $scope.username = 'Bryce';
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

gym.controller('LeaderBoardController', function($scope) {

  $scope.leaders = [
    {name: 'Chris', score: 9},
    {name: 'Meg', score: 17},
    {name: 'Danya', score: 12},
    {name: 'Mohammad', score: 21},
    {name: 'Darin', score: 3},
    {name: 'Emily', score: 8},
  ];

});