define(['angular', 'angularRoute', 'angularAnimate'], function(angular) {
 var app = angular.module('app', ['ui.router', 'ngAnimate']);

 app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/walletHub/1/');

  $stateProvider

   .state('test', {
   url: '/walletHub/:id/{folderPath:[a-zA-Z0-9/]*}',
   templateUrl: function($stateParams) {
    return "templates/" + $stateParams.id + '.html';
   },
   controllerProvider: function($stateParams) {
    console.log($stateParams)
    var ctrlName = $stateParams.id + "Controller";
    return ctrlName;
   }
  });
 });
 return app;
});