pollsApp.controller('IndexController', function ($scope, pollService) {
    $scope.polls = [];
    $scope.alert = {showAlert: false, alertClass: 'success', msg: ''};
    $scope.dataAvailable = true;
    var pageNumber = 1;

    $scope.loadPolls = function () {
        pollService.getData('polls', pageNumber).then(function (data) {
                if (data.polls.length < 5) {
                    $scope.dataAvailable = false;
                }
                angular.forEach(data.polls, function (value) {
                    $scope.polls.push(value);
                });
                pageNumber++;
            },
            function (error) {
                $scope.alert = {showAlert:true, msg: error, alertClass: 'danger'};
            }
        );
    };

    $scope.loadPolls();
});

pollsApp.controller('PollController', function ($scope, $routeParams, pollService) {
    $scope.poll = {};
    $scope.alert = {showAlert: false, alertClass: 'success', msg: ''};

    pollService.getData('poll', $routeParams.id).then(function (data) {
            $scope.poll = data.poll;
        },
        function (error) {
            $scope.alert = {showAlert: true, msg: error, alertClass: 'danger'};
        }
    );

    $scope.save = function () {
        if ($scope.poll.option) {
            pollService.postData($routeParams.id, {option: $scope.poll.option}).then(function (data) {
                    $scope.alert = { showAlert:true, msg: angular.fromJson(data).mesg, alertClass: 'success' };
                },
                function (error) {
                    $scope.alert = {showAlert:true, msg: error, alertClass: 'danger'};
                });
        } else {
            $scope.alert = {showAlert:true, msg: 'Select something please!', alertClass: 'warning'};
        }
    };

});

pollsApp.controller('StatsController', function ($scope, $routeParams, pollService) {
    $scope.id = $routeParams.id;
    var tempOptions = [];
    var tempStats = [];
    $scope.alert = {showAlert: false, alertClass: 'success', msg: ''};

    pollService.getData('stats', $routeParams.id).then(function (data) {
            //incomming data format:[{"option":"Kate","stats":"2"},{"option":"Sublime Text","stats":"7"},{"option":"Vim","stats":"4"}]
            angular.forEach(data.stats, function (value) {
                tempOptions.push(value.option);
                tempStats.push(value.stats);
            });
        },
        function (error) {
            $scope.alert = {showAlert:true, msg: error, alertClass: 'danger'};
        }
    );
    $scope.data = {
        series: tempOptions,
        data: [
            {
                y: tempStats
            }
        ]
    };
    $scope.chartType = 'bar';
    $scope.config = {
        labels: false,
        legend: {
            display: true,
            position: 'right'
        }
    };
});
