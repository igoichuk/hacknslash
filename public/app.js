
var bidsApp = angular.module('bidsApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all bids and show them
	//$http.get('/api/bids?user=1')
	$http.get('/api/bids')
        .success(function(data) {
            $scope.bids = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createBid = function() {
        $http.post('/api/bids', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.bids = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteBid = function(id) {
        $http.delete('/api/bids/' + id)
            .success(function(data) {
                $scope.bids = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}