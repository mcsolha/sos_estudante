angular.module('sos_estudante.services')
.service('PouchService', function($http,$q){
  var db = new PouchDB('http://186.214.78.208:3001/users');

  var UsuarioLogado;

  this.GetUsuarioLogado = function() {
    return UsuarioLogado;
  };

  this.SetUsuarioLogado = function(usuario) {
    UsuarioLogado = usuario;
  }

  this.Login = function(info) {
    var defer = $q.defer();
    db.get(info.email).then(function(doc) {
      console.log(doc);
      if(info.senha == doc.senha){
        UsuarioLogado = info.email;
        console.log('USUARIO CORRETO');
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

  this.CadastroUsuario = function(info){
    var doc = {
      _id: info.email,
      senha: info.senha,
      materias: [],
      tarefas: []
    }
    var defer = $q.defer();
    db.put(doc).then(function(response) {
      defer.resolve(response.ok);
    }).catch(function(err) {
      if(err.status != undefined)
        defer.reject(err.status);
      else
      defer.reject(err);
    });
    return defer.promise;
  }

  this.CadastroMateria = function(materia) {
    var defer = $q.defer();
    db.get(UsuarioLogado).then(function(doc) {
      var materias = doc.materias;
      materias.push(materia);
      return db.put({
        _id: UsuarioLogado,
        senha: doc.senha,
        _rev: doc._rev,
        materias: materias,
        tarefas: doc.tarefas
      });
    }).then(function(response){
      defer.resolve(response);
    }).catch(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  }

  this.RetMaterias = function() {
    var defer = $q.defer();
    db.get(UsuarioLogado).then(function(doc) {
      defer.resolve(doc.materias);
    }).catch(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  }
});
