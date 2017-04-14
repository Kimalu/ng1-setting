export default function commonTopicService($rootScope, $q) {

	return {
		publish(showResponeseErrorMessage, data, type) {
				if (type === true) {
					var defer = $q.defer();
					data = data ||{};
					if (angular.isString(data)) {
						data = {
							message: data,
							modalResultDeferred: defer
						}
					} else {
						data.modalResultDeferred = defer;

					}
					$rootScope.$emit(showResponeseErrorMessage, data);
					return defer.promise;
				}
				$rootScope.$emit(showResponeseErrorMessage, data);
			},

			subscribe(broadName, callfn) {
				return $rootScope.$on(broadName, callfn);
			}
	}
}
commonTopicService.$injector = ['$rootScope', '$q'];
