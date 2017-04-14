function commonError ($rootScope){
	// constructor($rootScope, grow) {
	// 	Object.assign(this, {
	// 		$rootScope, grow
	// 	})
	// }

	// on() {
		$rootScope.$on('showResponeseErrorMessage', (evt, data) => {
			console.log(data);
			return evt.preventDefault();
		})
	// }
}

commonError.$injector = ['$rootScope']
export default commonError;