angular.module('sos_estudante.services')
.service('calendarioAPI', ['compromissoFctr', function(compromissoFctr){
  var callbackFun = [];

  // Variável que armazena qual data foi selecionada pelo usuario através do calendário
  var dataSelecionada = '';

  // Simulaçao de tarefas criadas pelo usuário
  var dados = [
    {
      dia: '12 - Dec - 16',
      tarefas: [
        new compromissoFctr.Compromisso(0,'comer','12:00','13:00'),
        new compromissoFctr.Compromisso(1,'papar','12:00','14:00'),
        new compromissoFctr.Compromisso(2,'jantar','12:00','16:00'),
        new compromissoFctr.Compromisso(3,'Fazer as listas de Banco de Dados 2 e terminar todos os trabalhos incluindo o de Eng Software 2','12:00','13:00'),
        new compromissoFctr.Compromisso(4,'comer','12:00','13:00'),
        new compromissoFctr.Compromisso(5,'papar','12:00','14:00'),
        new compromissoFctr.Compromisso(6,'jantar','12:00','16:00'),
        new compromissoFctr.Compromisso(7,'Fazer as listas de Banco de Dados 2 e terminar todos os trabalhos incluindo o de Eng Software 2','12:00','13:00'),
        new compromissoFctr.Compromisso(8,'comer','12:00','13:00'),
        new compromissoFctr.Compromisso(9,'papar','12:00','14:00'),
        new compromissoFctr.Compromisso(10,'jantar','12:00','16:00'),
        new compromissoFctr.Compromisso(11,'Fazer as listas de Banco de Dados 2 e terminar todos os trabalhos incluindo o de Eng Software 2','12:00','13:00'),
        new compromissoFctr.Compromisso(12,'comer','12:00','13:00'),
        new compromissoFctr.Compromisso(13,'papar','12:00','14:00'),
        new compromissoFctr.Compromisso(14,'jantar','12:00','16:00'),
        new compromissoFctr.Compromisso(15,'Fazer as listas de Banco de Dados 2 e terminar todos os trabalhos incluindo o de Eng Software 2','12:00','13:00'),
        new compromissoFctr.Compromisso(16,'comer','12:00','13:00'),
        new compromissoFctr.Compromisso(17,'papar','12:00','14:00'),
        new compromissoFctr.Compromisso(18,'jantar','12:00','16:00'),
        new compromissoFctr.Compromisso(19,'Fazer as listas de Banco de Dados 2 e terminar todos os trabalhos incluindo o de Eng Software 2','12:00','13:00'),
        new compromissoFctr.Compromisso(20,'comer','12:00','13:00'),
        new compromissoFctr.Compromisso(21,'papar','12:00','14:00'),
        new compromissoFctr.Compromisso(22,'jantar','12:00','16:00'),
        new compromissoFctr.Compromisso(23,'Fazer as listas de Banco de Dados 2 e terminar todos os trabalhos incluindo o de Eng Software 2','12:00','13:00')
      ]
    }
  ];

  var ordenarCompromissos = function() {

  }

  return {
    // Funções chamadas para atualizar tela
    callbackFunction: function() {
      callbackFun = arguments;
    },
    // Função que retorna os dados fictícios
    retDados: function() {
      return dados;
    },
    // Função para adicionar dados novos
    adcDados: function(dia,comp) {
      // console.log(dado);
      for (var i = 0; i < dados.length; i++) { // Procura nos dados se ja existe pelo menos uma tarefa para o dia
        if(dados[i].dia == dia){
          comp.id = dados[i].tarefas[dados[dados.length - 1].tarefas.length - 1].id + 1;
          dados[i].tarefas.push(comp);
          for (var i = 0; i < callbackFun.length; i++) {
            callbackFun[i]();
          }
          return true;
        }
      }
      //Define como primeira tarefa para aquele dia selecionado e insere o dia selecionado nos dados
      comp.id = 0;
      var obj = {
        dia: dia,
        tarefas: [comp]
      }
      dados.push(obj);
      for (var i = 0; i < callbackFun.length; i++) {
        callbackFun[i]();
      }
      console.log(dados);
      return true;
    },
    // Função para retornar data selecionada
    retDataSelecionada: function() {
      return dataSelecionada;
    },
    // Função para definir data selecionada
    defDataSelecionada: function(value) {
      dataSelecionada = value;
    },
    // Função para formatar a data de acordo com o número do mês
    formatarData: function(dia,mes,ano, startindex = 0){
      if(startindex != 0){
        switch (mes) {
          case 1:
            mes = 'Jan';
            break;
          case 2:
            mes = 'Feb';
            break;
          case 3:
            mes = 'Mar';
            break;
          case 4:
            mes = 'Apr';
            break;
          case 5:
            mes = 'May';
            break;
          case 6:
            mes = 'Jun';
            break;
          case 7:
            mes = 'Jul';
            break;
          case 8:
            mes = 'Aug';
            break;
          case 9:
            mes = 'Sep';
            break;
          case 10:
            mes = 'Oct';
            break;
          case 11:
            mes = 'Nov';
            break;
          case 12:
            mes = 'Dec';
            break;
        }
      }else{
        switch (mes) {
          case 0:
            mes = 'Jan';
            break;
          case 1:
            mes = 'Feb';
            break;
          case 2:
            mes = 'Mar';
            break;
          case 3:
            mes = 'Apr';
            break;
          case 4:
            mes = 'May';
            break;
          case 5:
            mes = 'Jun';
            break;
          case 6:
            mes = 'Jul';
            break;
          case 7:
            mes = 'Aug';
            break;
          case 8:
            mes = 'Sep';
            break;
          case 9:
            mes = 'Oct';
            break;
          case 10:
            mes = 'Nov';
            break;
          case 11:
            mes = 'Dec';
            break;
        }
      }

      return dia + ' - ' + mes + ' - ' + ano.toString().substring(2);
    }
  }
}]);
