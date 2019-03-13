

var app = angular.module("app", ["xeditable", "ngMockE2E"]);

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

app.controller('Ctrl', function($scope, $filter, $http) {
    $scope.user = {
        id: 1,
        name: 'fill in who are your customers?',
        name222:'what is the pain statement that you are typing to solve for them?',
        name333:'what is the benifit that will match that pain statement?'
    };

    $scope.saveUser = function() {
        // $scope.user already updated!
        return $http.post('/saveUser', $scope.user).error(function(err) {
            if(err.field && err.msg) {
                // err like {field: "name", msg: "Server-side error for this username!"}
                $scope.editableForm.$setError(err.field, err.msg);
            } else {
                // unknown error
                $scope.editableForm.$setError('name', 'Unknown error!');
            }
        });
    };
});

// ---------------- mock $http requests --------------------
app.run(function($httpBackend) {


    $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
        data = angular.fromJson(data);
        if(data.name === 'error') {
            return [500, {field: 'name', msg: 'Server-side error for this username!'}];
        } else {
            return [200, {status: 'ok'}];
        }
    });
});


    var app2 = angular
        .module('playground', ['ngMaterial', 'angularjs-gauge'])
        .config(configApp)
        .controller('MainController', mainController);

    configApp.$inject = ['$mdThemingProvider'];

    function configApp($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('amber', {
                'default': '200' // use shade 200 for default, and keep all other shades the same
            });
    }

    mainController.$inject = [];

    function mainController() {
        var vm = this;
        vm.options = {
            type: 'arch',
            cap: 'round',
            size: 300,
            value: 45.3,
            thick: 20,
            label: 'Usage',
            append: 'GB',
            min: 0,
            max: 100,
            foregroundColor: 'rgba(0, 150, 136, 1)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        };

    }

angular.module('myApp', ['app','playground']);
