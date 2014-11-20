'use strict';

angular.module('myapp')
  .factory('Quiz', ['$resource', function ($resource) {

    // randomly shuffles an array
    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

    // calculate score based on time elapsed and attempts
    var calculateScore = function (start, end, attempts, questionsCount) {
        var baseScore = 100/questionsCount;
        var score = 0;
        var diff = (end - start) / 1000;
        var attemptsMultiplier = {0: 0, 1: 1, 2: 0.75, 3: 0.5};
  
        if (attempts > 3) {
            score = 0;
        } else if (diff <= 10) {
            score = baseScore * 1 * attemptsMultiplier[attempts];
        } else if (diff <= 20) {
            score = baseScore * 0.9 * attemptsMultiplier[attempts];
        } else if (diff <= 30) {
            score = baseScore * 0.8 * attemptsMultiplier[attempts];
        } else {
            score = baseScore * 0.75 * attemptsMultiplier[attempts];
        }

        console.log('score:', Math.round(score),
                    ', attempts:', attempts,
                    ', attemptsMultiplier:', attemptsMultiplier[attempts],
                    ', time: ', diff);

        return Math.round(score);
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
        processQandA: processQandA,
        calculateScore: calculateScore
    };

  }]);
