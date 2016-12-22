angular.module('sos_estudante.services')
.service('calendarioAPI', [function(){
  // Variável que armazena qual data foi selecionada pelo usuario através do calendário
  var dataSelecionada = '';

  // Simulaçao de tarefas criadas pelo usuário
  var dados = [
    {
      dia: '12 - Dec - 16',
      tarefas: ['fazer prova','estudar']
    },
    {
      dia: '14 - Dec - 16',
      tarefas: ['fazer p3','comer']
    },
    {
      dia: '16 - Dec - 16',
      tarefas: ['jogar','beber','cozinhar','desenhar','trocar chuveiro']
    },
    {
      dia: '2 - Jan - 17',
      tarefas: ['jogar','beber','cozinhar','desenhar','trocar chuveiro']
    }
  ];

  return {
    // Função que retorna os dados fictícios
    retDados: function() {
      return dados;
    },
    // Função para adicionar dados novos
    adcDados: function(dado) {
      dados.push(dado);
      console.log(dados);
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
