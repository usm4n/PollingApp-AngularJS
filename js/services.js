pollsApp.factory('pollService', function ($http, $q) {
        return {
            getData: function (route, param) {
                var defer = $q.defer();
                $http.get('http://localhost:8000/api/' + route + '/' + param).success(function (data) {
                        defer.resolve(data);
                    }
                ).error(function () {
                        defer.reject('An error has occurred :(');
                    }
                );
                return defer.promise;
            },
            postData: function (id, data) {
                var defer = $q.defer();
                data = $.param(data);
                $http.post('http://localhost:8000/api/poll/' + id + '/option', data,
                    {'headers': {
                        'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8'
                    }}).
                    success(function (data) {
                        defer.resolve(data);
                    }
                ).error(function () {
                        defer.reject('Cannot post data to the server :(');
                    }
                );
                return defer.promise;
            }
        };
    }
);
