angular.module('app')
    .controller('mainCtrl', function ($scope, $modal, $log) {

       // $scope.allFolders = localStorageService.get('folders');

        $scope.allFolders = [];
       /* $scope.states = ['inbox.folder', {
            url: '/inbox/folder',
            templateUrl: 'modules/create/email.html'
        }];

        var populateStates = function () {
            angular.forEach($scope.states, function(item) {
                $stateProvider.state(item[0], item[1]);
            });
        };*/

        $scope.addNewFolder = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modalContent.html',
                controller: 'ModalInstanceCtrl'
            });

            modalInstance.result.then(function (folder) {
                $scope.folder = folder;
                console.log($scope.folder);
                $scope.allFolders.push($scope.folder);
            }, function () {
                $log.info('Modal dismissed');
            });
        }
    })
    .controller('ModalInstanceCtrl', function($scope, $modalInstance) {

        $scope.ok = function (name) {
            $modalInstance.close(name);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });