'use strict';

angular.module('myapp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/scores', {
        templateUrl: 'scores/scores.html',
        controller: 'ScoresController',
        resolve:{
          resolvedScores: ['Scores', function (Scores) {
            return Scores.query();
          }]
        }
      })
    }]);
