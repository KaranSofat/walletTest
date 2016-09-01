define(['app'], function(app) {
 app.controller('1Controller', function($scope, $stateParams, $stateParams, $state, $http) {
  $http.get('sample.json')
   .then(function(res) {
    $scope.persons = res.data
   });

  var parts = $stateParams.folderPath.split('/')
  $scope.params = false;
  if (parts[0] != "") {
   $scope.parts = parts;
   $scope.params = true;

  }
 })
 return;
});