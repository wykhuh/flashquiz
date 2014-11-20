'use strict';

angular.module('myapp')
  .controller('ScoresController', ['$scope', 'resolvedScores', 'Scores',
    function ($scope, resolvedScores, Scores) {

      // $scope.scores = resolvedScores;

      $scope.scores = Scores.query();

      $scope.delete = function (id) {
        Scores.delete({id: id},
          function () {
            $scope.scores = Scores.query();
          });
      };

    }]);
