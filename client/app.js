var gym = angular.module('gym', ['ngRoute']);

// gym.config(function($routeProvider){
//   $routeProvider
//     .when()
// });

// gym.factory('playRound', function() {
//   $interval(function() {

//   });
// });

gym.controller('SimpleAdditionController', function($scope, $http) {

  $scope.update = function() {
    $scope.points = $scope.points || 0;
    $scope.a = Math.ceil(Math.random() * 100);
    $scope.b = Math.ceil(Math.random() * 100);
    $scope.answer = $scope.a + $scope.b;
  };

  $scope.update();

  $scope.checkAnswer = function() {
    if ($scope.answer === +$scope.attempt) {
      $scope.display = 'Woohoo!!! Great Mathing!!!';
      $scope.points++;
      $scope.update();
    } else {
      $scope.display = 'try again, you can do it ' + $scope.name + '!';
    }
    $scope.attempt = '';
  };

  // $scope.submitScore = function() {
  //   var name = $scope.name;
  //   var score = +$scope.score;

  //   var leader = new Leader({
  //     name: name,
  //     score: score
  //   });

  //   return $http({
  //     method: 'POST',
  //     url: '/api/leaders',
  //     data: leader
  //   })
  //   .then(function(resp) {
  //     resp.data;
  //   });
  // };

});

gym.controller('LeaderBoardController', function($scope, $http) {

  // $scope.leaders = [
  //   {name: 'Chris', score: 9},
  //   {name: 'Meg', score: 17},
  //   {name: 'Danya', score: 12},
  //   {name: 'Mohammad', score: 21},
  //   {name: 'Darin', score: 3},
  //   {name: 'Emily', score: 8},
  // ];

  $scope.submitScore = function() {
    var name = $scope.name;
    var score = +$scope.score;

    var newLeader = {
      name: name,
      score: score
    };

    var data = JSON.stringify(newLeader);

    $http({
      method: 'POST',
      url: '/api/leaders',
      data: data
    })
    .then(function(data) {
      console.log(data);
    });
  };

  $scope.getScores = function() {

    $http({
      method: 'GET',
      url: '/api/leaders',
    })
    .then(function(res) {
      $scope.leaders = res.data;
    });
  };

});