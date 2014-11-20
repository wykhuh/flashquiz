'use strict';

angular.module('myapp')
  .factory('Quiz', ['$resource', function ($resource) {
    // randomly shuffles an array
    var shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    };

    // reorganizes the questions data from the database 
    var processQandA = function (questions) {
        var list = [];
        var options = [];
  
        //shuffle order of the questions
        shuffle(questions);
  
        // shuffle the order of the options so correctAnswer isn't always first
        questions.forEach(function (question) {
            options = [question.correctAnswer, question.option1, question.option2, question.option3];
            shuffle(options);
            list.push({question: question.question, options: options, correctAnswer: question.correctAnswer});
        });
  
        return list;
    };

    return {
        processQandA: processQandA
    };

  }]);
