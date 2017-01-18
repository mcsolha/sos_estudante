angular.module('sos_estudante.services')
.service('ApiService', function($http,$q){
  var baseURL = "http://estudante.onthewifi.com/";

  var req = {
   method: 'GET',
   url: '/'
  //  headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
  //   'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
  //  }
  };

  this.callPost = function(data,resto){
    req.method = 'POST';
    req.data = data;
    var def = $q.defer();
    req.url = baseURL + resto;
    $http(req).success(function(data){
      def.resolve(data);
    }).error(function(data, status){
      def.reject("error-do-api-call-" + status);
    });
    return def.promise;
  }

  this.callGet = function(resto){
    req.method = 'GET';
    var def = $q.defer();
    req.url = baseURL + resto;
    $http(req).success(function(data){
      def.resolve(data);
    }).error(function(data, status){
      def.resolve(false);
    });
    return def.promise;
  }
});
