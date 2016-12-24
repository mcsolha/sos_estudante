angular.module('sos_estudante.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.matRias', {
    url: '/materias',
    views: {
      'tab1': {
        templateUrl: 'templates/matRias.html',
        controller: 'matRiasCtrl'
      }
    }
  })

  .state('tabsController.calendRio', {
    url: '/calendario',
    views: {
      'tab2': {
        templateUrl: 'templates/calendRio.html',
        controller: 'calendRioCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

//state da Nova Matéria
  .state('tabsController.novaMateria', {
    url:'/novaMateria',
    templateUrl:'templates/novaMateria.html',
    abstract: true
  })

$urlRouterProvider.otherwise('/page1/materias')



});
