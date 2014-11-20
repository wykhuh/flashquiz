'use strict';

angular.module('myapp')
  .factory('Questions', ['$resource', function ($resource) {
    return $resource('myapp/questions/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
