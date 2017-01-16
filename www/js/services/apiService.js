angular.module('sos_estudante.services')
.service('ApiService', function($http,$q){
  var baseURL = "http://192.168.15.107:3000/";

  var req = {
   method: 'GET',
   url: baseURL,
   headers: {
    'Access-Control-Allow-Origin': '*'
   }
  };

  this.callPost = function(data,resto){
    console.log(req.headers);
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
      def.reject("error-do-api-call-" + status);
    });
    return def.promise;
  }
});
