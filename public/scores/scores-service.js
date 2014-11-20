'use strict';

angular.module('myapp')
  .factory('Scores', ['$resource', function ($resource) {
    return $resource('myapp/scores/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
