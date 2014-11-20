'use strict';

angular.module('myapp')
  .controller('QuizController', ['$scope', '$location', 'Questions', 'Quiz',
    function ($scope, $location, Questions, Quiz) {
      var allQuestions = [],
        counter = 0,
        start = 0, 
        end = 0,
        attempts = 1,
        totalScore = 0;


      // get all the questions from the database and store them in memory
      Questions.query().$promise.then(function (questions) {
        // shuffle and process questions
        allQuestions = Quiz.processQandA(questions);

        // show first question
        start = Date.now();
        $scope.question = allQuestions[counter];
      });

      $scope.submit = function (guess) {
        console.log(guess, allQuestions[counter])
        // if user submits correct answer
        if(guess === allQuestions[counter].correctAnswer){

          // reset start, end and attempts, and calculate score
          end = Date.now();
          totalScore += Quiz.calculateScore(start, end, attempts);
          start = Date.now();
          attempts = 1;

          // calculate score go to next question 
          counter++;
          $scope.question = allQuestions[counter];


        // if user is wrong
        } else {
          attempts++;
        }

      }

    }]);
