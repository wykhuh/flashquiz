'use strict';

angular.module('myapp')
  .controller('QuizController', ['$scope', '$location', 'Questions', 'Quiz',
    function ($scope, $location, Questions, Quiz) {
      var allQuestions = [],
        counter = 0,
        start = 0,
        end = 0,
        attempts = 1,
        totalScore = 0,
        maxAttempts = 3;

      $scope.remainingAttempts = maxAttempts - attempts;
      
      $scope.showNextButton = false;
      $scope.errorMessage = false;


      // get all the questions from the database and store them in memory
      Questions.query().$promise.then(function (questions) {
        // shuffle and process questions
        allQuestions = Quiz.processQandA(questions);

        // show first question
        start = Date.now();
        $scope.question = allQuestions[counter];
      });

      $scope.next = function(){
        // show next question
        counter++;
        $scope.question = allQuestions[counter];


        // reset start time and attempts
        start = Date.now();
        attempts = 1;
        $scope.showNextButton = false;
      }

      $scope.submit = function (guess) {
        $scope.errorMessage = false;

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

        // else if user made more than max guesses, show next button
        } else if (attempts >= maxAttempts) {
          $scope.showNextButton = true;
          $scope.remainingAttempts = maxAttempts - attempts;
          attempts++;
        // if user is wrong
        } else {
          $scope.remainingAttempts = maxAttempts - attempts;
          attempts++;
          $scope.errorMessage = true;
        }

      }

    }]);
