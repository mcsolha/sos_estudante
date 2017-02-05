angular.module('sos_estudante.services')
.service('EstimativasService', [function(){

  this.callEstima(materiaSelec, notaDesejada){
    //calcula quanto ja tem de mediaFinal
    var soma = 0;
    for (var i = 0; i < materiaSelec.notaProvas.length; i++) {
      soma =  soma + materiaSelec.notaProvas[i]
    }
    var mediaProvas = soma/materiaSelec.qteProvas;

    soma = 0;
    for (var i = 0; i < materiaSelec.notaTrabalhos.length; i++) {
      soma =  soma + materiaSelec.notaTrabalhos[i]
    }
    var mediaTrabalhos = soma/materiaSelec.qteTrabalhos;

    soma = 0;
    for (var i = 0; i < materiaSelec.notaExercicios.length; i++) {
      soma =  soma + materiaSelec.notaExercicios[i]
    }
    var mediaExercicios = soma/materiaSelec.qteExercicios;

    var notaAtual = materiaSelec.criterio.mp*mediaProvas + materiaSelec.criterio.mt*mediaTrabalhos + materiaSelec.criterio.me*mediaExercicios;

    var notaP;
    var notaT;
    var notaE;
    if(notaAtual == notaDesejada){
        notaP = 0;
        notaE = 0;
        notaT = 0;
    }
    else
    {
      var notaRestante = notaDesejada - notaAtual;
      //para provas
      var numNotas= materiaSelec.qteProvas - materiaSelec.notaProvas.length;
      var totalPontos = notaRestante*materiaSelec.criterio.mp;
      notaP = totalPontos/numNotas;

      //para trabalhos
      numNotas= materiaSelec.qteTrabalhos - materiaSelec.notaTrabalhos.length;
      totalPontos = notaRestante*materiaSelec.criterio.mt;
      notaT = totalPontos/numNotas;

      //para Exercicios
      var numNotas= materiaSelec.qteExercicios - materiaSelec.notaExercicios.length;
      var totalPontos = notaRestante*materiaSelec.criterio.me;
      var notaE = totalPontos/numNotas;
    }

      //adiciona no vetor
     for (var i = 0; i < numNotas; i++) {
        materiaSelec.notaProvas.push(notaP);
     }
    for (var i = 0; i < numNotas; i++) {
        materiaSelec.notaTrabalhos.push(notaT);
    }
    for (var i = 0; i < numNotas; i++) {
       materiaSelec.notaExercicios.push(notaE);
    }
    return materiaSelec;
  }


}]);
