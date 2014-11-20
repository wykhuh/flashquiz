'use strict';

angular.module('myapp')
  .controller('ScoresController', ['$scope', '$modal', 'resolvedScores', 'Scores',
    function ($scope, $modal, resolvedScores, Scores) {

      // $scope.scores = resolvedScores;

      $scope.scores = Scores.query();

      $scope.delete = function (id) {
        Scores.delete({id: id},
          function () {
            $scope.scores = Scores.query();
          });
      };

    }]);
