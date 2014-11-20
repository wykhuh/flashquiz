'use strict';

angular.module('myapp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/questions', {
        templateUrl: 'views/questions/questions.html',
        controller: 'QuestionsController',
        resolve:{
          resolvedQuestions: ['Questions', function (Questions) {
            return Questions.query();
          }]
        }
      })
    }]);
