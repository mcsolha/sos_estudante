angular.module('sos_estudante.services')
.service('PouchService', function($http,$q){
  var db = new PouchDB('http://186.214.78.208:3001/users');

  this.Login = function(info) {
    var defer = $q.defer();
    db.get(info.email).then(function(doc) {
      console.log(doc);
      if(info.senha == doc.senha){
        defer.resolve(true);
      }else {
        defer.resolve('Usuário e/ou senha incorreto(s)');
      }
    }).catch(function(err) {
      // console.log('Usuário não existe');
      if(err.status == 404)
        defer.reject('Usuário não cadastrado');
    });
    return defer.promise;
  }

  this.Cadastro = function(info){
    var doc = {
      _id: info.email,
      senha: info.senha,
      materias: [],
      tarefas: []
    }
    var defer = $q.defer();
    db.put(doc).then(function(response) {
      console.log(response);
      defer.resolve(response.ok);
    }).catch(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  }
});
