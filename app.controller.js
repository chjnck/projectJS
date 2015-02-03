angular.module('app')
    .controller('mainCtrl', function ($scope, $modal, $log, router, localStorageService) {

        var folders = localStorageService.get('localFolders');
        var newStates = {};
        $scope.allFolders = [];

        if (folders !== null) {
            newStates = folders;
            console.log(newStates);
            for (var name in folders) {
                $scope.allFolders.push(name);
                console.log('add new state! ' + name);
            }
        }

        $scope.reload = function (collection) {
            router.setRoutes(collection);
        };

        $scope.addNewFolder = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modalContent.html',
                controller: 'ModalInstanceCtrl'
            });

            modalInstance.result.then(function (folder) {

                $scope.folder = folder;
                $scope.allFolders.push($scope.folder);
                newStates[$scope.folder] = {
                    "url": "/index/" + $scope.folder,
                    "templateUrl": "modules/inbox/customFolder.html"};
                $scope.reload(newStates);
                localStorageService.add('localFolders',newStates);

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