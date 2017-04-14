import TokensUtil from '../helpers/tokens';
const tokensUtil = new TokensUtil();
var _param = function(obj) {
	var query = '',
		name, value, fullSubName, subName, subValue, innerObj, i;

	for (name in obj) {
		value = obj[name];

		if (value instanceof Array) {
			for (i = 0; i < value.length; ++i) {
				subValue = value[i];
				fullSubName = name + '[' + i + ']';
				innerObj = {};
				innerObj[fullSubName] = subValue;
				query += _param(innerObj) + '&';
			}
		} else if (value instanceof Object) {
			for (subName in value) {
				subValue = value[subName];
				fullSubName = name + '[' + subName + ']';
				innerObj = {};
				innerObj[fullSubName] = subValue;
				query += _param(innerObj) + '&';
			}
		} else if (value !== undefined && value !== null) {
			query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
		}
	}
	query = query.length ? query.substr(0, query.length - 1) : query;
	return query;
}

function _param2(obj) {
	var query = '',
		name, value, fullSubName, subName, subValue, innerObj, i;
	for (name in obj) {
		value = obj[name];
		if (value instanceof Array) {
			for (i = 0; i < value.length; ++i) {
				subValue = value[i];
				innerObj = {};
				innerObj[value] = subValue;
				query += _param2(innerObj) + '&';
			}

		} else if (value instanceof Object) {
			for (subName in value) {
				subValue = value[subName];
				fullSubName = name + '[' + subName + ']';
				innerObj = {};
				innerObj[fullSubName] = subValue;
				query += _param2(innerObj) + '&';
			}

		} else {
			if (value !== undefined && value !== null) {
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}
		}

	}
	query = query.length ? query.substr(0, query.length - 1) : query;
	return query;
}

var errorMessage = {
	timeoutTipPrefix: '您当前的会话已超时，请',
	timeoutTipSufix: '重新登录',
	error: '当前请求失败，建议您刷新页面或者稍后重试。'
}
export class consoleConf {
	constructor() {
		this.responseSuccessCode = 200;
		this.enableSessionTimeout = true;
		this.sessionTimeoutCode = '';
		this.sessionTimeoutNeedCallbackFunc = true,
			this.labels = {
				SESSION_TIMEOUT1: errorMessage.timeoutTipPrefix,
				SESSION_TIMEOUT2: errorMessage.timeoutTipSufix,
				RESPONSE_ERROR: errorMessage.error
			}
	}

	linkHandler(link) {
		return link;
	}
	httpOptionWrapper(params) {
		return params;
	}
	httpOptionInterceptor(params) {
		return params;
	}

	httpResponseInterceptor(e) {
		return e;
	}
}


export class consoleSetting {
	constructor(consoleConf) {
		Object.assign(this, {
			'consolesetting': new consoleConf()
		})
	}
	setProviderOptions(opts) {
		angular.extend(this.consolesetting, opts)
	}
	setGlobalLabels(labels) {
		if (this.consolesetting) {
			this.consolesetting.labels = labels;
		}
	}
	$get() {
		return this.consolesetting
	}
}

consoleSetting.$inject = ['consoleConf'];

// export function consoleConf() {
// 	return new consoleConfClass();
// }

// export function consoleSetting(){
// 	return new consoleSettingClass();
// }

export function configHttpProvider($httpProvider) {
	$httpProvider.interceptors.push('consoleHttpInterceptor');
}

configHttpProvider.$injector = ['$httpProvider'];



export class consoleHttpInterceptor {
	constructor($q, $rootScope, consoleSetting, $injector) {
		Object.assign(this, {
			$q, $rootScope, $injector, consoleSetting: new consoleSetting
		})
	}
	request(req){
		let method = req.method;
		let url = req.url;
		let headers = req.headers;
		if (url.match(/^http:\/\/\w*cs.101.com/i) || url.match(/\/enterprises\/check\/.+\/exist/gi) || url.indexOf('biz-xml/list?datas=') != -1) {
			//              headers['Content-Type'] ='text/plain;';
			return req;
		}
		headers.Authorization = tokensUtil.getAuthHeader(url, method);
		return req;
	}
	response(res) {
		var data = res.data;
		if (this.consoleSetting.enableSessionTimeout && data.code == this.consoleSetting.sessionTimeoutCode) {
			this.$rootScope.$emit('consoleSessionTimeout', res);
			return $q.reject(res);
		} else {
			if (this.consoleSetting.httpResponseInterceptor(res, this.$injector) === true) {
				return this.$q.reject(res);
			} else {
				return res || this.$q.when(res);
			}
		}
	}
	responseError(res) {
		return this.$q.reject(res);
	}
}

consoleHttpInterceptor.$injector = ['$q', '$rootScope', 'consoleSetting', '$injector'];

// export class consoleRequestWrapper {
// 	constructor($http){
// 		Object.assign(this,{$http});
// 	}
// 	sendRequest(params) {
// 		var method = {
// 				method: 'POST'
// 			},
// 			options = angular.extend({}, method, params),
// 			o = options.method.toUpperCase();
// 		var ajaxHttp = this.$http(options).success(function($http, angular, _param2, params) {})
// 								.error(function($http, angular, _param2, params) {});
// 		if (o == 'POST') {
// 			options.headers = options.headers || {};
// 			options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// 			if (options.data === undefined && options.params) {
// 				options.data = _param2(options.params);
// 				delete options.params;
// 			} else {
// 				options.data = _param2(options.data)
// 			}
// 		} else if (o === 'GET') {
// 			options.params = options.params || {};
// 			options.params.__preventCache = (new Date()).getTime();
// 		}

// 		if (angular.isFunction(options.dataFormatter)) {
// 			ajaxHttp.then(function($http) {
// 				return options.dataFormatter.apply(null, [$http]);
// 			});
// 		}
// 		return ajaxHttp;
// 	}
// 	sendRequestWithUrl(url, params) {
// 		params = params || {};
// 		params.url = url;
// 		return this.sendRequest(params);
// 	}
// }

export function consoleRequestWrapper($http) {
	return {
		sendRequest(params) {
				var method = {
						method: 'POST'
					},
					options = angular.extend({}, method, params),
					o = options.method.toUpperCase();
			        var auth = tokensUtil.getAuthHeader(options.url, options.method);
					if(auth && o != 'GET'){
						options.headers = {Authorization: auth};
					}
			       // options.headers.Authorization = tokensUtil.getAuthHeader(options.url, options.method);
				var ajaxHttp = $http(options).success(function($http, _param2, params) {})
					.error(function($http, _param2, params) {});
				options.headers = options.headers || {};
				// options.headers['Access-Control-Allow-Origin']='*';
				if (o == 'GET') {
					options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
					if (options.data === undefined && options.params) {
						options.data = _param2(options.params);
						delete options.params;
					} else {
						options.data = _param2(options.data)
					}
				} else if (o === 'POST') {
					options.params = options.params || {};
					options.params.__preventCache = (new Date()).getTime();
				}
				// options.method = 'JSONP';
				// options.headers.Authorization = tokensUtil.getAuthHeader(options.url, options.method);

				if (angular.isFunction(options.dataFormatter)) {
					ajaxHttp.then(function($http) {
						return options.dataFormatter.apply(null, [$http]);
					});
				}
				return ajaxHttp;
			},
			sendRequestWithUrl(url, params) {
				params = params || {};
				params.url = url;
				return this.sendRequest(params);
			}
	}
}
consoleRequestWrapper.$injector = ['$http']


export function consoleRequest(requestWrapper, $q, consoleSetting, commonTopicService) {
	// console.log(consoleSetting)
	return function(url, params = {}) {
		var link = consoleSetting.linkHandler(url);
		if (params && params.method) {
			var method = params.method.toUpperCase();
			if (method == 'POST') {
				if (params.data === undefined) {
					params.data = {}
				}
				consoleSetting.httpOptionInterceptor(params);
			}
		} else {
			params.method = 'GET';
			// console.log(_param(params.data))
			if(params.data){
				url = url + '?' + _param(params.data)
			}
		}

		consoleSetting.httpOptionWrapper(params);
		return requestWrapper.sendRequestWithUrl(url, params).then(function(res) {
			var data = res.data,
				config = res.config;
			return $q.resolve(res);;
		}, function(res) {
			if (params && params.ignoreErrorHandler && params.ignoreErrorHandler == 1) {
				$q.reject(res);
			} else {
				if (res.status !== 200) {
					commonTopicService.publish('showResponseErrorMessage', res.data && res.data.message, true);
				}
			}
			return $q.reject(res);
		});
	}
}

consoleRequest.$inject = ['consoleRequestWrapper', '$q', 'consoleSetting', 'commonTopicService'];

//错误统一过滤处理
export function httpErrorHanlder($rootScope, commonTopicService, consoleSetting, consoleConf, growl) {
	// console.log(consoleSetting)
	// consoleSetting = new consoleSetting();
	var labels = consoleSetting.labels;
	if ($rootScope.gConfig == undefined) {
		$rootScope.gConfig = {
			sessionTimeout: !1
		}
	}

	$rootScope.$on('consoleSessionTimeout', function(i, s) {
		var url;
		if (consoleSetting.sessionTimeoutNeedCallbackFunc) {
			url = consoleSetting.sessionTimeoutLink + '?oauth_callback=' + encodeURIComponent(location.href)
		} else {
			url = consoleSetting.sessionTimeoutLink + encodeURIComponent(location.href);
		}
		var errorTmpl = labels.SESSION_TIMEOUT1 + '<a href=' + url + '>' + labels.SESSION_TIMEOUT2 + '</a>。';
		if (rootScope.gConfig.sessionTimeout == 0) {
			$rootScope.gConfig.sessionTimeout = true;
			setTimeout(function() {
				var e = commonTopicService.publish('showResponseErrorMessage', errorTmpl, true);
				e.then(function(e) {
					window.location = url;
				})
			}, 0);
		};
	});
	$rootScope.$on('showResponseErrorMessage', function(evt, data) {
		growl.addErrorMessage((data || {}).message || '')
		return evt.preventDefault();
	});
}

httpErrorHanlder.$inject = ['$rootScope', 'commonTopicService', 'consoleSetting', 'appDialogConfig', 'growl']



function responsePreHandler(res, injector, withoutData, noPublish) {
	if (res.status == 200) {
		var result = res.data ||{};
		if (!result.code && !(result.message || result.msg)) {
			return result;
		} else {
			if (noPublish == true) {
				return;
			}
			var resultPromise;
			if (injector) {
				injector.invoke(['commonTopicService', function(commonTopicService) {
					resultPromise = commonTopicService.publish('showResponseErrorMessage', result, true);
				}]);
			} else {
				resultPromise = result;
			}
			return resultPromise;
		}

	}
}

export function appConsoleRequest($injector, $q) {
	return function(params) {
		var defer = $q.defer();
		$injector.invoke([params.serviceModule, function(serviceModule) {
			serviceModule[params.serviceAction](params.params).then(function(data) {
				var handleparams = [data, $injector];
				if (params.withoutData) {
					handleparams.push(params.withoutData);
				}
				if (params.noPublish) {
					handleparams.push(params.noPublish);
				}

				var preHandleparams = responsePreHandler.apply(null, handleparams);
				if (!preHandleparams || preHandleparams && typeof preHandleparams.then != 'function') {
					defer.resolve(preHandleparams);
				} else {
					defer.reject(preHandleparams);
				}
			})
		}]);
		return defer.promise;
	}
}

appConsoleRequest.$injector = ['$injector', '$q'];
