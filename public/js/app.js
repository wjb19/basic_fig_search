angular.module('figSearch', ['appRoutes'])

.factory('apiDataRequest', function($http) {

    return function(url) {
        return $http.get(url).then(function(response) {
            return response.data;
        }, function(err) {
            throw {
                message: 'server error',
                status: err.status,
                data: err.data
            };
        });
    }
})

.run(function($rootScope, $filter) {


    })
    
.controller('SearchController', 
function(apiDataRequest,$window,$scope,$rootScope, $http) {

	$scope.sequence_a="";
	$scope.sequence_b="";

	$scope.search = function()
	{
		var url = '/api/record/' + $scope.sequence_a + '/' + $scope.sequence_b;
        	
		apiDataRequest(url).then(function(result) {
            		$scope.docs = result;

			if (result.length<1)
			{
				$scope.selected_filename=[];
				$scope.msg="no results for this combination: " + $scope.sequence_a + "/" + $scope.sequence_b;
			}
			else
				$scope.msg="";
        	});

		$scope.source_url = "http://arxiv.org/abs/" + $scope.sequence_a + "/" + $scope.sequence_b;

	}
    $scope.select_file = function(doc) {
            $scope.selected_filename = doc.data;
	    $scope.selected_image = doc.image;

	    var url = '/api/down/' + $scope.selected_filename;
	    var blob, dlink;
	    $http.get(url).success(function(req, status) {


                blob = new Blob([req], {
                    type: 'text/plain'
                });
                dlink = $window.URL || $window.webkitURL;

                $scope.fileURL = dlink.createObjectURL(blob);

            }).error(function(data, status) {
                $scope.response = 'request failed';
            });
	};


});
