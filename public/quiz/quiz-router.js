'use strict';

angular.module('myapp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/quiz', {
        templateUrl: 'quiz/quiz.html',
        controller: 'QuizController'
      })
    }]);
