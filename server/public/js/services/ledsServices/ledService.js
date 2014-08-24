angular.module('controllingRpi')
	.factory('ledService', function ($http, $q) {
		var Socket = {
			UPDATE_STATE: 'updateState'
		}

		return {
			socket: Socket
		}
	});