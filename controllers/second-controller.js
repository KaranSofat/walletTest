define(['app'], function(app) {
 app.controller('2Controller', function($scope, shareDataService, $stateParams, $state) {

  $scope.num = {
   n1: 0,
   n2: 0,
   n3: 0,
   n4: 0
  }
  $scope.result = function() {
   $scope.num.n4 = $scope.num.n2 + $scope.num.n1 + $scope.num.n3;
  }

  $scope.result1 = function() {
   res = $scope.num.n4 / 3
   $scope.num.n3 = res
   $scope.num.n2 = res
   $scope.num.n1 = res
  }
  $scope.shared = function() {

   shareDataService.addList($scope.data);
   $state.go('test', {
    "id": 3
   })
  }
  var parts = $stateParams.folderPath.split('/')
  $scope.params = false;
  if (parts[0] != "") {
   $scope.parts = parts;
   $scope.params = true;

  }
 })
 return;
});