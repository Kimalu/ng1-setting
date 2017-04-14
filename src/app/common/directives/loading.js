import spinJs from 'spin.js'

function appLoading(){
	return {
		restrict: 'A',
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			let loadingConfig = {
				12: {
					lines: 8,
					length: 1,
					width: 2,
					radius: 3
				},
				16: {
					lines: 8,
					length: 2,
					width: 2,
					radius: 4
				},
				24: {
					lines: 9,
					length: 3,
					width: 3,
					radius: 6
				},
				32: {
					lines: 9,
					length: 4,
					width: 4,
					radius: 8
				},
				40: {
					lines: 10,
					length: 6,
					width: 4,
					radius: 10
				},
				48: {
					lines: 10,
					length: 6,
					width: 5,
					radius: 13
				},
				64: {
					lines: 12,
					length: 10,
					width: 5,
					radius: 16
				}
			};
			let options = loadingConfig[iAttrs.size] || loadingConfig[16];
			options.zIndex = 99;
			let spin = new spinJs(options).spin(iElm[0]);
		}
	};
}

export default appLoading; 