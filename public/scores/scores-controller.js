'use strict';

angular.module('myapp')
  .controller('ScoresController', ['$scope', '$modal', 'resolvedScores', 'Scores',
    function ($scope, $modal, resolvedScores, Scores) {

      // $scope.scores = resolvedScores;

      $scope.scores = [{score: 10, questionsCount: 3, date: Date()}, 
                       {score: 30, questionsCount: 4, date: Date()},
                      {score: 20, questionsCount: 5, date: Date()}]

      $scope.delete = function (id) {
        Scores.delete({id: id},
          function () {
            $scope.scores = Scores.query();
          });
      };

    }]);
