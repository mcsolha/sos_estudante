angular.module('sos_estudante.controllers')
.controller('tarefasCtrl', ['$scope', '$stateParams', 'ApiService', '$state', '$ionicPopup', '$ionicPopover',
function ($scope, $stateParams, ApiService, $state, $ionicPopup, $ionicPopover) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $ionicPopover.fromTemplateUrl('./templates/tarefasPopover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.remover = false;

  $scope.buscar = false;
  // Array que contém as tarefas do dia selecionado
  $scope.tarefas = $stateParams.tarefas;
}]);
