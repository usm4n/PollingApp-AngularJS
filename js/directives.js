pollsApp.directive('pollAlert', function () {
    return {
        restrict: 'E',
        scope: {
            showAlert: '=',
            alertMessage : '=',
            alertClass: '='
        },
        template: '<div class="alert alert-{{alertClass}}" ng-show="showAlert">' +
            '<button type="button" class="close" ng-click="close()">&times;</button>' +
            '<p>{{alertMessage}}</p>' +
            '</div>',
        link: function(scope) {
            scope.close = function() {
                scope.showAlert = false;
            };
        }
    };
});