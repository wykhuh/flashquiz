'use strict';

angular.module('myapp')
  .controller('QuestionsController', ['$scope', '$location', 'resolvedQuestions', 'Questions',
    function ($scope, $location, resolvedQuestions, Questions) {

      $scope.questions = resolvedQuestions;


      $scope.update = function (id) {
        $scope.questions = Questions.get({id: id});
      };

      $scope.cancel = function () {
         $location.path('/questions');
      };

      $scope.delete = function (id) {
        Questions.delete({id: id},
          function () {
            $scope.questions = Questions.query();
          });
      };

      $scope.save = function (question) {
        Questions.save(question);
         $location.path('/questions');
      };


    }])
;
