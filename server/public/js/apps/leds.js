angular.module('controllingRpi')
	.controller('ledCtrl', function ($scope, ledService) {
		var socket = io();

		$scope.$watch('leds', function (nv, ov) {
			console.log('leds:', nv, ov);
			if (nv != ov) {
				console.log('here');
				socket.emit(ledService.socket.UPDATE_STATE, nv.pin12);
			}
		}, true);

		$scope.leds = {
			pin12: false
		}

	});