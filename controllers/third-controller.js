define(['app'], function(app) {
 app.controller('3Controller', function($scope, shareDataService, $stateParams, $state) {

  $scope.lists = shareDataService.getList();
  var parts = $stateParams.folderPath.split('/')
  $scope.params = false;
  if (parts[0] != "") {
   $scope.parts = parts;
   $scope.params = true;

  }
 })
 return;
});