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

.directive('myCalendar', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      dateformat: "="
    },
    controller: ['$scope','$filter', '$ionicPopup', 'ionicTimePicker' , function($scope, $filter, $ionicPopup, ionicTimePicker) {

      // Objeto para configurar time picker
      var ipObj = {
        inputTime: 50400,   //Optional
        format: 24,         //Optional
        step: 5,           //Optional
        setLabel: 'Definir',    //Optional
        closeLabel: 'Cancelar'
      };

      // Função para popup
      $scope.showPopup = function(dataSelecionada) {
        $scope.data = {
          dataSelec: dataSelecionada
        };
        $scope.horaIni = function() {
          ipObj.callback = function(val) {
            if (typeof (val) === 'undefined') {
              console.log('Time not selected');
            } else {
              console.log(val);
              var selectedTime = new Date(val * 1000);
              // console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
              $scope.data.horaIniSelected = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes();
            }
          }
          ionicTimePicker.openTimePicker(ipObj);
        }
        $scope.horaFin = function() {
          ipObj.callback = function(val) {
            if (typeof (val) === 'undefined') {
              console.log('Time not selected');
            } else {
              var selectedTime = new Date(val * 1000);
              // console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
              $scope.data.horaFinSelected = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes();
            }
          }
          ionicTimePicker.openTimePicker(ipObj);
        }
        var myPopup = $ionicPopup.show({
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

        myPopup.then(function(res) {
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

      $scope.displayCompleteDate = function() {
        var timeStamp = new Date(selectedYear, selectedMonth, selectedDate).getTime();
        if (angular.isUndefined($scope.dateformat)) {
          var format = "dd - MMM - yy";
        } else {
          var format = $scope.dateformat;
        }
        $scope.display = $filter('date')(timeStamp, format);

        $scope.showPopup($scope.display);
        console.log($scope.display);
      }

      //Onload Display Current Date
      // $scope.displayCompleteDate();

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
        console.log(selectedDate);
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
                  "date": (prevMonthLastDates - startDay + 1) + j
                };
              } else {
                $scope.datesDisp[i][j] = {
                  "type": "currentMonth",
                  "date": countDatingStart++
                };
              }
            }
          } else {
            for (k = 0; k < 7; k++) {
              if (countDatingStart <= endingDateLimit) {
                $scope.datesDisp[i][k] = {
                  "type": "currentMonth",
                  "date": countDatingStart++
                };
              } else {
                $scope.datesDisp[i][k] = {
                  "type": "newMonth",
                  "date": nextMonthStartDates++
                };
              }
            }
          }

        }
      }
      $scope.displayMonthCalendar();
    }],
    template: '<style>' +
      '.ionic_Calendar .calendar_Date .row.Daysheading {text-align:center;}' +
      '.ionic_Calendar .txtCenter {text-align:center;}' +
      '.ionic_Calendar .col.selMonth { background-color: #444; color:white; }' +
      '.ionic_Calendar .col.selDate { background-color: #444; color:white; }' +
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
      '</style>' +
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
      '		  <div class="col" ng-repeat = "colVal in rowVal  track by $index" ng-class="{\'fadeDateDisp\':(colVal.type == \'oldMonth\' || colVal.type == \'newMonth\'), \'selDate\':(colVal.date == displayDate && colVal.type == \'currentMonth\')}"  ng-click="selectedDateClick(colVal)" >{{colVal.date}}</div> ' +
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
      '</div>'
  };
});

//http://stackoverflow.com/questions/30841817/error-the-connection-to-the-server-was-unsuccessful-in-cordova-and-jquery/30846420#30846420

//https://blog.nraboy.com/2014/12/use-grunt-lint-uglify-javascript-project/
//https://css-tricks.com/gulp-for-beginners/
