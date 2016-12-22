angular.module('ionicCalendarDisplay', [])
  .filter('rangecal', function() {
    return function(input, total) {
      total = parseInt(total);

      for (var i = 0; i < total; i++) {
        input.push(i);
      }

      return input;
    };
  })

.directive('calendario', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      dateformat: "="
    },
    controller: ['$scope','$filter', '$ionicPopup', 'ionicTimePicker' , 'calendarioAPI', function($scope, $filter, $ionicPopup, ionicTimePicker, calendarioAPI) {
      $scope.tarefas = []

      // Objeto para configurar time picker
      var tempoConfig = {
        inputTime: 50400,   //Optional
        format: 24,         //Optional
        step: 5,           //Optional
        setLabel: 'Definir',    //Optional
        closeLabel: 'Cancelar'
      };

      // Função para popup
      $scope.mostrarPopup = function(dataSelecionada) {
        $scope.data = {
          dataSelec: dataSelecionada
        };
        $scope.horaIni = function() {
          tempoConfig.callback = function(val) {
            if (typeof (val) === 'undefined') {
              console.log('Tempo nao selecionado');
            } else {
              console.log(val);
              var tempoSelecionado = new Date(val * 1000);
              // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');
              $scope.data.horaIniSelected = tempoSelecionado.getUTCHours() + ':' + tempoSelecionado.getUTCMinutes();
            }
          }
          ionicTimePicker.openTimePicker(tempoConfig);
        }
        $scope.horaFin = function() {
          tempoConfig.callback = function(val) {
            if (typeof (val) === 'undefined') {
              console.log('Tempo não selecionado');
            } else {
              var tempoSelecionado = new Date(val * 1000);
              // console.log('Selected epoch is : ', val, 'and the time is ', tempoSelecionado.getUTCHours(), 'H :', tempoSelecionado.getUTCMinutes(), 'M');
              $scope.data.horaFinSelected = tempoSelecionado.getUTCHours() + ':' + tempoSelecionado.getUTCMinutes();
            }
          }
          ionicTimePicker.openTimePicker(tempoConfig);
        }
        var popup = $ionicPopup.show({
          templateUrl: '../../templates/calendarioPopup.html',
          title: 'Compromisso',
          scope: $scope,
          buttons: [
            {
              text: '<b>Salvar</b>',
              type: 'button-positive',
              onTap: function(e) {
                if(typeof($scope.data.horaIniSelected) === 'undefined' && typeof($scope.data.horaFinSelected) === 'undefined') {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return $scope.data;
                }
              }
            },
            { text: 'Cancelar' }
          ]
        });

        popup.then(function(res) {
          console.log('Compromisso gravado' ,res);
        });
      }

      var calMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

      // these are the days of the week for each month, in order
      var calDaysForMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      var selectedYear, selectedMonth, selectedDate, shortMonth;

      var CurrentDate = new Date();

      $scope.calMonths = [
        [{
          'id': 0,
          'name': 'Jan'
        }, {
          'id': 1,
          'name': 'Fev'
        }, {
          'id': 2,
          'name': 'Mar'
        }, {
          'id': 3,
          'name': 'Abr'
        }],
        [{
          'id': 4,
          'name': 'Mai'
        }, {
          'id': 5,
          'name': 'Jun'
        }, {
          'id': 6,
          'name': 'Jul'
        }, {
          'id': 7,
          'name': 'Ago'
        }],
        [{
          'id': 8,
          'name': 'Set'
        }, {
          'id': 9,
          'name': 'Out'
        }, {
          'id': 10,
          'name': 'Nov'
        }, {
          'id': 11,
          'name': 'Dez'
        }]
      ];

      selectedYear = CurrentDate.getFullYear(),
        selectedMonth = CurrentDate.getMonth(),
        selectedDate = CurrentDate.getDate();

      $scope.UICalendarDisplay = {};
      $scope.UICalendarDisplay.Date = true;
      $scope.UICalendarDisplay.Month = false;
      $scope.UICalendarDisplay.Year = false;

      var condicao = function(compromisso) {
        return compromisso.dia == $scope.display;
      }

      var trocarLista = function() {
        $scope.tarefas = [];
        var compromisso = calendarioAPI.retDados().find(condicao);
        console.log(compromisso);
        if(compromisso !== undefined){
          compromisso.tarefas.forEach(function(tarefa) {
            $scope.tarefas.push(tarefa);
          })
        }
      }

      $scope.displayCompleteDate = function() {
        var timeStamp = new Date(selectedYear, selectedMonth, selectedDate).getTime();
        if (angular.isUndefined($scope.dateformat)) {
          var format = "dd - MMM - yy";
        } else {
          var format = $scope.dateformat;
        }
        $scope.display = $filter('date')(timeStamp, format);
        calendarioAPI.defDataSelecionada($scope.display);
        trocarLista();
        //$scope.mostrarPopup($scope.display);
        //console.log($scope.display);
      }

      //Onload Display Current Date
      $scope.displayCompleteDate();

      $scope.UIdisplayDatetoMonth = function() {
        $scope.UICalendarDisplay.Date = false;
        $scope.UICalendarDisplay.Month = true;
        $scope.UICalendarDisplay.Year = false;
      }

      $scope.UIdisplayMonthtoYear = function() {
        $scope.UICalendarDisplay.Date = false;
        $scope.UICalendarDisplay.Month = false;
        $scope.UICalendarDisplay.Year = true;
      }

      $scope.UIdisplayYeartoMonth = function() {
        $scope.UICalendarDisplay.Date = false;
        $scope.UICalendarDisplay.Month = true;
        $scope.UICalendarDisplay.Year = false;
      }
      $scope.UIdisplayMonthtoDate = function() {
        $scope.UICalendarDisplay.Date = true;
        $scope.UICalendarDisplay.Month = false;
        $scope.UICalendarDisplay.Year = false;
      }

      $scope.selectedMonthPrevClick = function() {
        selectedDate = 1;
        if (selectedMonth == 0) {
          selectedMonth = 11;
          selectedYear--;
        } else {
          $scope.dislayMonth = selectedMonth--;
        }
        $scope.displayMonthCalendar();
      }

      $scope.selectedMonthNextClick = function() {
        selectedDate = 1;
        if (selectedMonth == 11) {
          selectedMonth = 0;
          selectedYear++;
        } else {
          $scope.dislayMonth = selectedMonth++;
        }
        $scope.displayMonthCalendar();
      }

      $scope.selectedMonthYearPrevClick = function() {
        selectedYear--;
        $scope.displayYear = selectedYear;
        $scope.displayMonthCalendar();
      }

      $scope.selectedMonthYearNextClick = function() {
        selectedYear++;
        $scope.displayYear = selectedYear;
        $scope.displayMonthCalendar();
      }

      $scope.selectedDecadePrevClick = function() {
        selectedYear -= 10;
        $scope.displayMonthCalendar();
      }

      $scope.selectedDecadeNextClick = function() {
        selectedYear += 10;
        $scope.displayMonthCalendar();
      }

      $scope.selectedYearClick = function(year) {
        $scope.displayYear = year;
        selectedYear = year;
        $scope.displayMonthCalendar();
        $scope.UICalendarDisplay.Date = false;
        $scope.UICalendarDisplay.Month = true;
        $scope.UICalendarDisplay.Year = false;
        // $scope.displayCompleteDate();
      }

      $scope.selectedMonthClick = function(month) {
        $scope.dislayMonth = month;
        selectedMonth = month;
        $scope.displayMonthCalendar();
        $scope.UICalendarDisplay.Date = true;
        $scope.UICalendarDisplay.Month = false;
        $scope.UICalendarDisplay.Year = false;
        // $scope.displayCompleteDate();
      }

      $scope.selectedDateClick = function(date) {
        $scope.displayDate = date.date;
        selectedDate = date.date;
        if (date.type == 'newMonth') {
          var mnthDate = new Date(selectedYear, selectedMonth, 32)
          selectedMonth = mnthDate.getMonth();
          selectedYear = mnthDate.getFullYear();
          $scope.displayMonthCalendar();
        } else if (date.type == 'oldMonth') {
          var mnthDate = new Date(selectedYear, selectedMonth, 0);
          selectedMonth = mnthDate.getMonth();
          selectedYear = mnthDate.getFullYear();
          $scope.displayMonthCalendar();
        }
        $scope.displayCompleteDate();
      }

      var temCompromisso = function(dia,mes,ano) {
        var data = calendarioAPI.formatarData(dia,mes,ano,1);
        // console.log(data);
        for (var i = 0; i < calendarioAPI.retDados().length; i++) {
          if(calendarioAPI.retDados()[i].dia == data){
            return true;
          }
        }
        return false;
      }

      $scope.displayMonthCalendar = function() {

        /*Year Display Start*/
        $scope.startYearDisp = (Math.floor(selectedYear / 10) * 10) - 1;
        $scope.endYearDisp = (Math.floor(selectedYear / 10) * 10) + 10;
        /*Year Display End*/


        $scope.datesDisp = [
          [],
          [],
          [],
          [],
          [],
          []
        ];
        countDatingStart = 1;

        if (calMonths[selectedMonth] === 'February') {
          if (selectedYear % 4 === 0) {
            endingDateLimit = 29;
          } else {
            endingDateLimit = 28;
          }
        } else {
          endingDateLimit = calDaysForMonth[selectedMonth];
        }
        startDay = new Date(selectedYear, selectedMonth, 1).getDay();

        $scope.displayYear = selectedYear;
        $scope.dislayMonth = calMonths[selectedMonth];
        $scope.shortMonth = calMonths[selectedMonth].slice(0, 3);

        $scope.displayDate = selectedDate;

        var nextMonthStartDates = 1;
        var prevMonthLastDates = new Date(selectedYear, selectedMonth, 0).getDate();

        for (i = 0; i < 6; i++) {
          if (typeof $scope.datesDisp[0][6] === 'undefined') {
            for (j = 0; j < 7; j++) {
              if (j < startDay) {
                $scope.datesDisp[i][j] = {
                  "type": "oldMonth",
                  "date": (prevMonthLastDates - startDay + 1) + j,
                  "month": selectedMonth,
                  "comCompr": true
                };
              } else {
                $scope.datesDisp[i][j] = {
                  "type": "currentMonth",
                  "date": countDatingStart++,
                  "month": selectedMonth + 1,
                  "comCompr": true
                };
              }
            }
          } else {
            for (k = 0; k < 7; k++) {
              if (countDatingStart <= endingDateLimit) {
                $scope.datesDisp[i][k] = {
                  "type": "currentMonth",
                  "date": countDatingStart++,
                  "month": selectedMonth + 1,
                  "comCompr": true
                };
              } else {
                if(selectedMonth+2 <= 12){
                  $scope.datesDisp[i][k] = {
                    "type": "newMonth",
                    "date": nextMonthStartDates++,
                    "month": selectedMonth + 2,
                    "comCompr": true
                  };
                }else{
                  $scope.datesDisp[i][k] = {
                    "type": "newMonth",
                    "date": nextMonthStartDates++,
                    "month": 1,
                    "comCompr": true
                  };
                }
              }
            }
          }
        }

        for (var i = 0; i < $scope.datesDisp.length; i++) {
          let dateDisp = $scope.datesDisp[i];
          for (var j = 0; j < dateDisp.length; j++) {
            dateDisp[j].comCompr = temCompromisso(dateDisp[j].date,dateDisp[j].month,selectedYear);
            // console.log(dateDisp[j]);
          }
        }
      }
      $scope.displayMonthCalendar();
      calendarioAPI.callbackFunction($scope.displayMonthCalendar,$scope.displayCompleteDate);
    }],
    template: '<style>' +
      '.ionic_Calendar .calendar_Date .row.Daysheading {text-align:center;}' +
      '.ionic_Calendar .txtCenter {text-align:center;}' +
      '.ionic_Calendar .col.selMonth { background-color: #444; color:white; }' +
      '.ionic_Calendar .col.selDate { background-color: #444; color:white; }' +
      '.ionic_Calendar .col.comCompr { color:red !important; }'+
      '.ionic_Calendar .col.selYear { background-color: #444; color:white;  }' +
      '.ionic_Calendar .col.fadeDateDisp, .col.fadeYear { background-color: #E9E9E9; color:#D5D5D5 }' +
      '.ionic_Calendar .DaysDisplay .col{ border: 1px solid #F3F3F3; padding-top: 10px; font-weight: bolder; height: 40px;}' +
      '.ionic_Calendar .DaysDisplay.row{ padding-left: 0px; padding-right: 0px; }' +
      '.ionic_Calendar .MonthsDisplay.row{ padding-left: 0px; padding-right: 0px; }' +
      '.ionic_Calendar .MonthsDisplay .col{ border: 1px solid #F3F3F3; padding-top: 30px; font-size: 18px;  height: 80px;}' +
      '.ionic_Calendar .YearsDisplay.row{ padding-left: 0px; padding-right: 0px; }' +
      '.ionic_Calendar .YearsDisplay .col{ border: 1px solid #F3F3F3; padding-top: 30px; font-size: 18px; height: 80px;}' +
      '.ionic_Calendar .marginTop0 { margin-top: 0px !important;}' +
      '.ionic_Calendar .paddingBottom0 { padding-bottom: 0px !important;}' +
      '.ionic_Calendar .Daysheading_Label .col { padding-bottom: 0px !important;}' +
      '.busca-box { width:40%; float:right; line-height:25px; border-color: #445; border-radius: 5px; border-width:1px; margin-top:2px; }' +
      '.titulo {float:left; padding: 5px 0;}'+
      '.busca-lupa:hover { color:#445; }' +
      '.busca-lupa:active { color:#d8d8d8; }'+
      '</style>' +
      '<div>' +
        '<div class="ionic_Calendar">' +
        '	<div class="calendar_Date" ng-show="UICalendarDisplay.Date">' +
        '		<div class="row" style=" background-color: #3F3F3F;  color: white;">' +
        '		  <div class="col txtCenter" ><i class="icon ion-chevron-left" ng-click="selectedMonthPrevClick()"></i></div>' +
        '		  <div class="col col-75 txtCenter" ng-click="UIdisplayDatetoMonth()">{{dislayMonth}} {{displayYear}}</div>' +
        '		  <div class="col txtCenter"><i class="icon ion-chevron-right"  ng-click="selectedMonthNextClick()"></i></div>' +
        '		</div>' +
        '		<div class="row Daysheading Daysheading_Label" style="background-color: #383737; color: white;">' +
        '		  <div class="col">Dom</div><div class="col">Seg</div><div class="col">Ter</div><div class="col">Qua</div><div class="col">Qui</div><div class="col">Sex</div><div class="col">Sab</div>' +
        '		</div>' +
        '		<div class="row Daysheading DaysDisplay" ng-repeat = "rowVal in datesDisp  track by $index" ng-class="{\'marginTop0\':$first}">' +
        '		  <div class="col" ng-repeat = "colVal in rowVal  track by $index" ng-class="{\'fadeDateDisp\':(colVal.type == \'oldMonth\' || colVal.type == \'newMonth\'), \'selDate\':(colVal.date == displayDate && colVal.type == \'currentMonth\'), \'comCompr\':(colVal.comCompr)}"  ng-click="selectedDateClick(colVal)" >{{colVal.date}}</div> ' +
        '		</div>' +
        '	</div>' +
        '	<div class="calendar_Month" ng-show="UICalendarDisplay.Month">' +
        '		<div class="row" style=" background-color: #3F3F3F;  color: white;">' +
        '		  <div class="col txtCenter"><i class="icon ion-chevron-left" ng-click="selectedMonthYearPrevClick()"></i></div>' +
        '		  <div class="col col-75 txtCenter" ng-click="UIdisplayMonthtoYear()">{{displayYear}}</div>' +
        '		  <div class="col txtCenter"><i class="icon ion-chevron-right" ng-click="selectedMonthYearNextClick()"></i></div>' +
        '		</div>' +
        '		<div class="row txtCenter MonthsDisplay" ng-repeat = "rowVal in calMonths  track by $index" ng-class="{\'marginTop0\':$first}">' +
        '		  <div class="col" ng-repeat = "colVal in rowVal  track by $index"  ng-class="(colVal.name == shortMonth) ? \'selMonth\' : \'NonSelMonth\'"  ng-click="selectedMonthClick(colVal.id)" >{{colVal.name}}</div>' +
        '		</div>' +
        '	</div>' +
        '	<div class="calendar_Year" ng-show="UICalendarDisplay.Year">' +
        '		<div class="row" style=" background-color: #3F3F3F;  color: white;">' +
        '		  <div class="col txtCenter"><i class="icon ion-chevron-left" ng-click="selectedDecadePrevClick()"></i></div>' +
        '		  <div class="col col-75 txtCenter">{{startYearDisp+1}}-{{endYearDisp-1}}</div>' +
        '		  <div class="col txtCenter"><i class="icon ion-chevron-right" ng-click="selectedDecadeNextClick()"></i></div>' +
        '		</div>' +
        '		<div class="row txtCenter YearsDisplay" ng-repeat = "nx in []| rangecal:3" ng-class="{\'marginTop0\':$first}">' +
        '		  <div class="col" ng-repeat="n in [] | rangecal:4"  ng-class="{ \'fadeYear\': (((startYearDisp+nx+nx+nx+nx+n) == startYearDisp)||((startYearDisp+nx+nx+nx+nx+n) == endYearDisp)), \'selYear\': ((startYearDisp+nx+nx+nx+nx+n) == displayYear) }" ng-click="selectedYearClick((startYearDisp+nx+nx+nx+nx+n))">{{startYearDisp+nx+nx+nx+nx+n}}</div>' +
        '		</div>' +
        '	</div>' +
        '</div>' +
        '<div class="item item-divider item-icon-right" ng-if="tarefas.length > 0">' +
          '<div class="titulo">Compromissos</div>' +
          '<i class="icon ion-search busca-lupa" ng-click="cliqueLupa()"></i>' +
          '<input class="busca-box">' +
        '</div>' +
        '<ion-list show-delete="true">' +
          '<ion-item ng-repeat = "item in tarefas" class="item-left">' +
            '<h2 style="word-wrap: break-word; white-space:normal;">{{item.titulo}}: {{item.horaIniSelected}} - {{item.horaFinSelected}}</h2>' +
            '<ion-delete-button class="ion-minus-circled dark" ng-click="items.splice($index, 1)">' +
            '</ion-delete-button>' +
          '</ion-item>' +
        '</ion-list>' +
      '</div>'
  };
});

//http://stackoverflow.com/questions/30841817/error-the-connection-to-the-server-was-unsuccessful-in-cordova-and-jquery/30846420#30846420

//https://blog.nraboy.com/2014/12/use-grunt-lint-uglify-javascript-project/
//https://css-tricks.com/gulp-for-beginners/
