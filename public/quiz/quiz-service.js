'use strict';

angular.module('myapp')
  .factory('Quiz', ['$resource', function ($resource) {


    // reorganizes the questions data from the database 
    var processQandA = function (questions) {
        var list = [];
        var options = [];
  

  
        // shuffle the order of the options so correctAnswer isn't always first
        questions.forEach(function (question) {
            options = [question.correctAnswer, question.option1, question.option2, question.option3];
            list.push({question: question.question, options: options, correct: question.correctAnswer});
        });
  
        return list;
    };

    return {
        processQandA: processQandA
    };

  }]);
