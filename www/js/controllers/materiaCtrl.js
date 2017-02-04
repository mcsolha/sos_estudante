angular.module('sos_estudante.controllers')
.controller('matRiasCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', 'ionicTimePicker','$ionicPopover', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $ionicPopup, ionicTimePicker, $ionicPopover,$state) {

  $scope.number =10;

  $scope.getNumber = function(number){
    return new Array(number);
  }
  //Objeto a ser mandado para o banco de dados
  $scope.data = {};
  //Scope dos dados da nova matéria
  $scope.materia = {};

    // Função utilizada para formatar o numero
  function FormatarNumero(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
  }

  var timePickerObj = {
    inputTime: 50400,   //Optional
    format: 24,         //Optional
    step: 5,           //Optional
    setLabel: 'Definir',    //Optional
    closeLabel: 'Cancelar'
  };

  // Função que chama o seletor de tempo para armazenar hora inicial
  $scope.horaIni = function() {
    timePickerObj.callback = function(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        // console.log(val);
        var tempoSelecionado = new Date(val * 1000);
        // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');

        $scope.data.horaIniSelected = FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2);
      }
    }
    ionicTimePicker.openTimePicker(timePickerObj);
  }

  // Função que chama o seletor de tempo para armazenar hora final
  $scope.horaFin = function() {
    timePickerObj.callback = function(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var tempoSelecionado = new Date(val * 1000);
        // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');
        $scope.data.horaFinSelected = FormatarNumero(tempoSelecionado.getUTCHours(),2) + ':' + FormatarNumero(tempoSelecionado.getUTCMinutes(),2);;
      }
    }
    ionicTimePicker.openTimePicker(timePickerObj);
  }

  $scope.diasSemana = [{},{},{},{},{},{}];
  for(i=0;i<6;i++){
   $scope.diasSemana[i].class = "button-stable button-outline";
  }
  $scope.selecDia = function(i) {
    console.log(i);
    if ($scope.diasSemana[i].class === "button-stable button-outline"){
      $scope.diasSemana[i].class = "button-dark";
    }
    else{
      $scope.diasSemana[i].class = "button-stable button-outline";
    }
  }
  //////////////MODAL
  //MODAL DA NOVA MATÉRIA
  $ionicModal.fromTemplateUrl('./templates/novaMateria.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    //ABRE MODAL
  $scope.openModal = function() {
    $scope.modal.show();
  };
  //FECHA MODAL
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //////////FIM MODAL//

  /////////POPUP de editar notas
  $scope.showPopup = function() {
    $scope.data = {};
    // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: 'Notas',
        templateUrl: './templates/tabNotas.html',
        scope: $scope,
        buttons: [
          { text: '<b>Salvar',
            type: 'button-dark'},
          {
            text: 'Cancelar',
          }
        ]
      });
      $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
  };

//////////////////////////Inicio Dados Materia////////////////////////////////
$scope.abreDados = function(materia){
  console.log(materia);
  $state.go('dadosMateria',{materia: materia})
}
// $ionicModal.fromTemplateUrl('./templates/dadosMaterias.html', {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modalDados) {
//     $scope.modalDados = modalDados;
//   });
//   //ABRE MODAL
// $scope.openModalDados = function(materia,index) {
//   $scope.materiaSelec = materia;
//   $scope.faltasDisp = calculaFaltas();
//   $scope.tamanhoTabela = tamTabela();
//   $scope.modalDados.show();
// };
// //FECHA MODAL
// $scope.closeModalDados = function() {
//   $scope.modalDados.hide();
// };

// function tamTabela(){
//   var maior = $scope.materiaSelec.notaProvas.length;
//  if ($scope.materiaSelec.notaTrabalhos.length > maior)
//    maior = $scope.materiaSelec.notaTrabalhos.length;
//  if($scope.materiaSelec.notaExercicios.length >  maior)
//    maior = $scope.materiaSelec.notaExercicios.length;
//    return new Array(maior);
// }
//
// function calculaFaltas(){
//     var p = $scope.materiaSelec.faltas.porcFaltas/100;
//     var disponivel = (p*$scope.materiaSelec.faltas.totalAulas) - $scope.materiaSelec.faltas.qtdeFaltas;
//     return disponivel;
// }

// //Inicio MODAL DA estimativas
//  $ionicModal.fromTemplateUrl('./templates/estimativas.html', {
//      scope: $scope,
//      animation: 'slide-in-up'
//    }).then(function(modal) {
//      $scope.modalEst = modal;
//    });
//    //ABRE MODAL
//  $scope.openModalEst = function() {
//    $scope.modalEst.show();
//  };
//  //FECHA MODAL
//  $scope.closeModalEst = function() {
//    $scope.modalEst.hide();
//  };
//  //Fim modal Estimativas

//  //Inicio POPUP Faltas
//  $scope.onshowPopUpFaltas = function(){
//    $scope.maisFaltas = 1;
//    var fPopUp = $ionicPopup.show({
//      title: 'Incluir Faltas',
//      templateUrl:'./templates/faltasPopup.html',
//      scope: $scope,
//      buttons:[
//        {text: "Salvar",
//        type: 'button-dark'},
//        {text: "Cancelar"}
//      ],
//    });
//    $timeout(function() {
//     fPopUp.close(); //close the popup after 3 seconds for some reason
//   },3000);
// };
//  //Fim POPup faltas

  //preenchendo conteudo dos cards
  $scope.materias = [{
    nome:"Redes",
    dia:"Quinta",
    hora:"14:00",
    fim:"18:00",
    professor: "Kelton",
    dataAula: [{
      diaSemana: "Segunda",
      horaIni: {
        hora: 10,
        min:  30
      },
      horaFin: {
        hora: 12,
        min:  30
      }
    },{
    diaSemana : "Terça",
    horaIni : {
      hora: 14,
      min:  30
    },
    horaFin : {
      hora: 18,
      min:  30
    }
  }],
    criterio :{
      mp : 0.8,
      mt : 0.1,
      me : 0.1
    },
    notaProvas : [7.5, 4.5, 5.5],
    notaTrabalhos : [8.0, 9.5],
    notaExercicios : [7.5, 6.8, 9.0, 7.4],
    faltas: {
      totalAulas: 60,
      porcFaltas: 30,
      qtdeFaltas: 2
    },
    arquivado:"false"
  },{
    nome:"Engenharia de Software 2",
    dia:"Segunda",
    hora:"10:00",
    fim:"12:00",
    arquivado:"true"
  },{
    nome:"Inteligência Artificial",
    dia:"Segunda",
    hora:"08:00",
    fim:"10:00",
    arquivado:"false"
  },{
    nome:"Computação Gráfica",
    dia:"Sexta",
    hora:"08:00",
    fim:"12:00",
    arquivado:"false"
  }];


 // //Começo do popOver
 // $ionicPopover.fromTemplateUrl('./templates/dadosMatPopOver.html', {
 //   scope: $scope,
 // }).then(function(popover) {
 //   $scope.popoverDados = popover;
 // });
 // //Fim do popOver
 //
 // $scope.arquiva = function(){
 //   for (var i = 0; i < $scope.materias.length; i++) {
 //     if($scope.materiaSelec.nome ==  $scope.materias[i].nome){
 //       $scope.materias[i].arquivado = true;
 //     }
 //   }
 //
 // }

//////////////////////////Fim Dados Materia////////////////////////////////
}

])
