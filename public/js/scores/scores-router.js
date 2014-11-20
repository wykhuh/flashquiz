'use strict';

angular.module('myapp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/scores', {
        templateUrl: 'views/scores/scores.html',
        controller: 'ScoresController',
        resolve:{
          resolvedScores: ['Scores', function (Scores) {
            return Scores.query();
          }]
        }
      })
    }]);
