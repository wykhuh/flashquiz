'use strict';

angular.module('myapp')
  .controller('QuizController', ['$scope', '$location', 'Questions', 'Quiz',
    function ($scope, $location, Questions, Quiz) {
      var allQuestions = [],
        counter = 0;


      // get all the questions from the database and store them in memory
      Questions.query().$promise.then(function (questions) {
        // shuffle and process questions
        allQuestions = Quiz.processQandA(questions);

        // show first question
        $scope.question = allQuestions[counter];
      });

      $scope.submit = function (guess) {
        console.log(guess, allQuestions[counter])
        // if quess equals answer
        if(guess === allQuestions[counter].correctAnswer){
          // calculate score go to next question 
          counter++;
          $scope.question = allQuestions[counter];
        }

      }

    }]);
