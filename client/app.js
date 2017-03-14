var gym = angular.module('gym', ['ngRoute']);

gym.controller('GymController', function($scope, $http, $interval) {
  ///////////
  // Timer
  //////////
  $scope.timer = 15;

  var interval;

  $scope.play = function() {
    $scope.timer = 15;

    interval = $interval(function() {
      if ($scope.timer > 0) {
        $scope.timer = $scope.timer - 1;
      } else {
        $scope.endRound();
      }
    }, 1000);
  };

  $scope.endRound = function() {
    $interval.cancel(interval);
    interval = undefined;
    $scope.score = $scope.points;
  };

  /////////////////
  // Practice Area
  /////////////////

  $scope.update = function() {
    $scope.a = Math.ceil(Math.random() * 100);
    $scope.b = Math.ceil(Math.random() * 100);
    $scope.answer = $scope.a + $scope.b;
  };

  //initialize view
  $scope.points = 0;
  $scope.update();

  $scope.checkAnswer = function() {
    if ($scope.answer === +$scope.attempt) {
      $scope.display = 'Woohoo!!! Great Mathing!!!';
      if (interval !== undefined) {
        $scope.points++;
      }
      $scope.update();
    } else {
      $scope.display = 'try again, you can do it ' + $scope.name + '!';
    }
    $scope.attempt = '';
  };

  /////////////////////////////
  // send score to db
  /////////////////////////////

  $scope.submitScore = function() {
    var name = $scope.name;
    var score = +$scope.score;

    if (!score || !name) {
      return;
    }

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
    .then(function() {
      $scope.points = 0;
      $scope.score = undefined;
      $scope.getScores();
    });
  };

  /////////////////////////////
  // get data for Leaderboard
  /////////////////////////////

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