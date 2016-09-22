(function () {
    'use strict';
    angular.module('app.node')
        .factory('addWorkerNodeFormModal', addWorkerNodeFormModal);

    /* @ngInject */
    function addWorkerNodeFormModal($mdDialog) {

        return {
            open: open
        };

        function open(templateUrl, ev) {
            var dialog = $mdDialog.show({
                controller: FormModalCtrl,
                controllerAs: 'formCtrl',
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });
            return dialog;
        }

        /* @ngInject */
        function FormModalCtrl($mdDialog, nodeBackend, $state, $scope) {
            var self = this;

            self.ok = function () {
                var data = {
                    Role: 'worker',
                    Endpoint: self.endpoint
                };
                nodeBackend.addWorkerNode(data, $scope.staticForm)
                    .then(function(data){
                        Notification.success($filter('translate')('Created successfully'));
                        $state.reload()
                    })
            };

            self.cancel = function () {
                $mdDialog.cancel();
            };
        }
    }
})();