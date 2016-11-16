angular.module('appRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', '$compileProvider', function($routeProvider, $locationProvider, $compileProvider) {

	        $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|http|https):/);

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'search.html',
			controller: 'SearchController'
		})

		.when('/help', {
			templateUrl: 'help.html'
		})


	$locationProvider.html5Mode(true);

}]);
