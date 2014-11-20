'use strict';

angular.module('myapp')
  .controller('QuestionsController', ['$scope', '$modal', 'resolvedQuestions', 'Questions',
    function ($scope, $modal, resolvedQuestions, Questions) {

      $scope.questions = resolvedQuestions;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.questions = Questions.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Questions.delete({id: id},
          function () {
            $scope.questions = Questions.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Questions.update({id: id}, $scope.questions,
            function () {
              $scope.questions = Questions.query();
              $scope.clear();
            });
        } else {
          Questions.save($scope.questions,
            function () {
              $scope.questions = Questions.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.questions = {
          
          "question": "",
          
          "correctAnswer": "",
          
          "option1": "",
          
          "option2": "",
          
          "option3": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var questionsSave = $modal.open({
          templateUrl: 'questions-save.html',
          controller: 'QuestionsSaveController',
          resolve: {
            questions: function () {
              return $scope.questions;
            }
          }
        });

        questionsSave.result.then(function (entity) {
          $scope.questions = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('QuestionsSaveController', ['$scope', '$modalInstance', 'questions',
    function ($scope, $modalInstance, questions) {
      $scope.questions = questions;

      

      $scope.ok = function () {
        $modalInstance.close($scope.questions);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
