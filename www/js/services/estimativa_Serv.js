angular.module('sos_estudante.services')
.service('estimativasService', [function(){

  this.callEstima = function(mat, notaDesejada){

    //calcula quatidade de espaços vazios
    var numNotasP = mat.qteProvas - mat.notaProvas.length;
    var numNotasT = mat.qteTrabalhos - mat.notaTrabalhos.length;
    var numNotasE = mat.qteExercicios - mat.notaExercicios.length;
    var resto;
    var notaP = 0;
    var notaT = 0;
    var notaE = 0;
    //calcula somatorio provas
    if(numNotasP > 0){
      var soma = 0;
      for (var i = 0; i < mat.notaProvas.length; i++) {
        soma =  soma + mat.notaProvas[i]
      }
      var notaRestante = (mat.qteProvas*(notaDesejada/mat.criterioAval.mp)) - soma;
      notaP = notaRestante/numNotasP;
      //se passar de 10
      if(notaP > 10){
        resto = notaP - 10;
        notaP = 10;

      //calcula trabalho
      if(numNotasT > 0){
        soma = 0;
        for (var i = 0; i < mat.notaTrabalhos.length; i++) {
          soma =  soma + mat.notaTrabalhos[i]
        }
        notaRestante = (mat.qteTrabalhos*(resto/mat.criterioAval.mt)) - soma;
        notaT = notaRestante/numNotasT;

        if(notaT > 10){
            resto = notaT - 10;
            notaT = 10;

        //calcula exercicio
        if(numNotasE > 0){
            soma = 0;
            for (var i = 0; i < mat.notaExercicios.length; i++) {
              soma =  soma + mat.notaExercicios[i]
            }
            notaRestante = (mat.qteExercicios*(resto/mat.criterioAval.me)) - soma;
            notaE = notaRestante/numNotasE;
          }
        }
        else if(notaT < 0)
          notaT = 0;
      }

      //calcula exercicio
      else if(numNotasE > 0){
        soma = 0;
        for (var i = 0; i < mat.notaExercicios.length; i++) {
          soma =  soma + mat.notaExercicios[i]
        }
        notaRestante = (mat.qteExercicios*(resto/mat.criterioAval.me)) - soma;
        notaE = notaRestante/numNotasE;

        if(notaE > 10){
          console.log("estourou1");
          notaE = 10;
        }
        else if(notaE < 0) {
          notaE = 0;
        }
      }
    }
    else if(notaP < 0)
      notaP = 0;
  }
  else if(numNotasT > 0){
    //calcula trabalho
      soma = 0;
      for (var i = 0; i < mat.notaTrabalhos.length; i++) {
        soma =  soma + mat.notaTrabalhos[i]
      }
      notaRestante = (mat.qteTrabalhos*(notaDesejada/mat.criterioAval.mt)) - soma;
      notaT = notaRestante/numNotasT;

      if(notaT > 10){
          resto = notaT - 10;
          notaT = 10;

      //calcula exercicio
      if(numNotasE > 0){
          soma = 0;
          for (var i = 0; i < mat.notaExercicios.length; i++) {
            soma =  soma + mat.notaExercicios[i]
          }
          notaRestante = (mat.qteExercicios*(resto/mat.criterioAval.me)) - soma;
          notaE = notaRestante/numNotasE;

          if(notaE > 10){
            notaE = 10;
           console.log("estourou2");
          }
          else if(notaE < 0) {
            notaE = 0;
          }
      }
    }
    else if(notaT < 0)
      notaT = 0;
  }
  else if(numNotasE > 0){
      soma = 0;
      for (var i = 0; i < mat.notaExercicios.length; i++) {
        soma =  soma + mat.notaExercicios[i]
      }
      notaRestante = (mat.qteExercicios*(notaDesejada/mat.criterioAval.me)) - soma;
      notaE = notaRestante/numNotasE;

      if(notaE > 10){
        console.log("estourou3");
        notaE = 10;
      }
      else  if(notaE < 0){
        notaE = 0;
      }
    }

    //adiciona no vetor
    if(numNotasP > 0 ){
      for (var i = 0; i < numNotasP; i++) {
         mat.notaProvas.push(notaP);
      }
    }
    if(numNotasT > 0){
      for (var i = 0; i < numNotasT; i++) {
          mat.notaTrabalhos.push(notaT);
      }
    }
    if(numNotasE > 0){
      for (var i = 0; i < numNotasE; i++) {
         mat.notaExercicios.push(notaE);
      }
    }

    soma = 0;
    for (var i = 0; i < mat.notaProvas.length; i++) {
      soma =  soma + mat.notaProvas[i]
    }
    var mediaProvas = soma/mat.qteProvas;

    soma = 0;
    for (var i = 0; i < mat.notaTrabalhos.length; i++) {
      soma =  soma + mat.notaTrabalhos[i]
    }
    var mediaTrabalhos = soma/mat.qteTrabalhos;

    soma = 0;
    for (var i = 0; i < mat.notaExercicios.length; i++) {
      soma =  soma + mat.notaExercicios[i]
    }
    var mediaExercicios = soma/mat.qteExercicios;

    mat.mediaFinal = mat.criterioAval.mp*mediaProvas + mat.criterioAval.mt*mediaTrabalhos + mat.criterioAval.me*mediaExercicios;

    if(mat.mediaFinal > 10){
      mat.mediaFinal = 10;
    }
    else if(mat.mediaFinal < 0){
      mat.mediaFinal = 0;
    }
    mat.mediaFinal = parseFloat(mat.mediaFinal.toFixed(2));

    return mat;
 }

}]);
