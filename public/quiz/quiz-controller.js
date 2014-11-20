'use strict';

angular.module('myapp')
  .controller('QuizController', ['$scope', '$location',
    function ($scope, $location) {

      // $scope.scores = resolvedScores;

      $scope.question = {question: 'How many states', 
                          options: ['50', '11','12','23']
                        }


    }]);
