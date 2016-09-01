require.config({
	paths: {
		angular: 'https://code.angularjs.org/1.5.5/angular.min',
		angularRoute: 'https://rawgit.com/angular-ui/ui-router/0.2.15/release/angular-ui-router.min',
		angularAnimate: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min',
		
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularAnimate': ['angular']
	},
	priority: [
		"angular"
	],
});

require([
	'angular',
	'app',
	'controllers/first-controller',
		'controllers/second-controller',
		'controllers/third-controller',
		'services/services',
		'directives/directives'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['app']);
		});
	}
);