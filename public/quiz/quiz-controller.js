'use strict';

angular.module('myapp')
  .controller('QuizController', ['$scope', '$location', 'Questions','Quiz',
    function ($scope, $location, Questions, Quiz) {
      var allQuestions = [];

      Questions.query().$promise.then(function(questions){
        allQuestions = Quiz.processQandA(questions);
        $scope.question = allQuestions[0];
      });

    }]);
