'use strict';

angular.module('myapp')
  .controller('ScoresController', ['$scope', '$modal', 'resolvedScores', 'Scores',
    function ($scope, $modal, resolvedScores, Scores) {

      $scope.scores = resolvedScores;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.scores = Scores.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Scores.delete({id: id},
          function () {
            $scope.scores = Scores.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Scores.update({id: id}, $scope.scores,
            function () {
              $scope.scores = Scores.query();
              $scope.clear();
            });
        } else {
          Scores.save($scope.scores,
            function () {
              $scope.scores = Scores.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.scores = {
          
          "score": "",
          
          "date": "",
          
          "questionsCount": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var scoresSave = $modal.open({
          templateUrl: 'scores-save.html',
          controller: 'ScoresSaveController',
          resolve: {
            scores: function () {
              return $scope.scores;
            }
          }
        });

        scoresSave.result.then(function (entity) {
          $scope.scores = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('ScoresSaveController', ['$scope', '$modalInstance', 'scores',
    function ($scope, $modalInstance, scores) {
      $scope.scores = scores;

      
      $scope.dateDateOptions = {
        dateFormat: 'yy-mm-dd',
        
        
      };

      $scope.ok = function () {
        $modalInstance.close($scope.scores);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
