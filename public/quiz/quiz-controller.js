'use strict';

angular.module('myapp')
  .controller('QuizController', ['$scope', '$location', 'Questions', 'Quiz', 'Scores',
    function ($scope, $location, Questions, Quiz, Scores) {
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
      $scope.showScore = false;
      $scope.highestScore = 0;

      // get all the questions from the database and store them in memory
      Questions.query().$promise.then(function (questions) {
        // shuffle and process questions
        allQuestions = Quiz.processQandA(questions);

        // show first question
        start = Date.now();
        $scope.question = allQuestions[counter];
      });

      // show the final and highest score, and store score in database
      var showScore = function () {
          $scope.showScore = true;
          $scope.totalScore = totalScore;
          // gets the highest  score from the database
          Scores.query().$promise.then(function(res) {
            if(res[0]){
              $scope.highestScore = res[0].score;
            }
          });
          // save score to database
          Scores.save({score: totalScore, date: Date(), questionsCount: allQuestions.length });
      };


      $scope.next = function(){
        // show next question
        counter++;

        // if there aren't any more questions, show score
        if (!allQuestions[counter]) {
            showScore();
        // else if there are more questions, show next question
        } else {
            // reset start time and attempts; hide next button
            start = Date.now();
            attempts = 1;
            $scope.question = allQuestions[counter];
            $scope.showNextButton = false;
        }
      }


      $scope.submit = function (guess) {
        $scope.errorMessage = false;

        // if there aren't any more questions, show score
        if (!allQuestions[counter]) {
            showScore();

        // else if user submits correct answer
        } else if (guess === allQuestions[counter].correctAnswer){

          // reset start, end and attempts, and calculate score
          end = Date.now();
          totalScore += Quiz.calculateScore(start, end, attempts, allQuestions.length);
          start = Date.now();
          attempts = 1;

          // if there are more questions, show next question
          counter++;
          if(allQuestions[counter]){
            $scope.question = allQuestions[counter];
          //else show final score
          } else {
            showScore();
          }

        // else if user made more than max guesses, show next button
        } else if (attempts >= maxAttempts) {
          $scope.showNextButton = true;

        // if user is wrong, show error message
        } else {
          $scope.remainingAttempts = maxAttempts - attempts;
          attempts++;
          $scope.errorMessage = true;
        }

      }

    }]);
