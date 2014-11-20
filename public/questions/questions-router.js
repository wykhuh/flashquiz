'use strict';

angular.module('myapp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/questions', {
        templateUrl: 'questions/questions.html',
        controller: 'QuestionsController',
        resolve:{
          resolvedQuestions: ['Questions', function (Questions) {
            return Questions.query();
          }]
        }
      })
      .when('/questions/add', {
        templateUrl: './questions/question_form.html',
        controller: 'QuestionsController',
        resolve:{
          resolvedQuestions: ['Questions', function (Questions) {
            return Questions.query();
          }]
        }
      })
    }]);
