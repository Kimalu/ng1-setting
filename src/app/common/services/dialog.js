import messageTmpl from './template/message.html';

class dialogConfig {
	constructor(){
		this.defaultConfig = {
			defaultButtonConfig: [{
				result: true,
				label: '确定',
				cssClass: 'btn-primary'
			}, {
				result: false,
				label: '取消',
				cssClass: 'btn-default'
			}]
		};
	}

	setButtonLabels (config) {
		angular.forEach(this.defaultConfig.defaultButtonConfig, function(value, key) {
			value.label = config[key];
		});
	}
	
	setProviderOptions (config) {
		angular.extend(this.defaultConfig, config);
	}

	$get() {
		return this.defaultConfig;
	}

}

class dialogFactory{
	constructor ($rootScope, $modal, $modalStack, appDialogConfig) {
        Object.assign(this, {$rootScope, $modal, $modalStack, appDialogConfig});
	}

	showDialog(directiveConfig) {
		const backdrop = {
				backdrop: 'static'
			};
		const	config = angular.extend({}, backdrop, directiveConfig);
		const	diaConfig = this.$modal.open(config);
		return diaConfig;
	}

 	showDialogByUrl(url, callback, passedObject) {
		let config;
		let locationChangeSuccess;
		const directiveConfig = {
			templateUrl: url,
			resolve: {
				passedObject: function() {
					return passedObject
				}
			},
			controller
		};

		 function controller($scope, $modalInstance, $rootScope, $modalStack, passedObject) {
			 locationChangeSuccess = $scope.$on('$locationChangeSuccess', function() {
				if (config && $scope._dialogShow == 1) {
					$scope.close(false);
				}
			});
			var iconClass = 'icon-warning-2';
			if (passedObject != undefined && passedObject.iconClass) {
				iconClass = passedObject.iconClass;
			}
			var iconColor = 'text-warning';
			if (passedObject != undefined && passedObject.iconColor) {
				iconColor = passedObject.iconColor;
			}

			$scope.iconClass = iconClass + ' ' + iconColor;
			$scope._passedObject = passedObject;
			$scope._dialogShow = true;
			$scope.close = function(callback) {
				$scope._dialogShow = false;
				$modalInstance.close(callback);
				config = null
			};
			if (angular.isFunction(callback)) {
				callback($scope);
			}
		}

		controller.$inject=['$scope', '$uibModalInstance', '$rootScope', '$uibModalStack', 'passedObject'];
				
		if (passedObject && passedObject.windowClass) {
			directiveConfig.windowClass = passedObject.windowClass;
		}
		config = this.showDialog(directiveConfig);
		var a = function(e) {
			if (locationChangeSuccess) {
				locationChangeSuccess();
			}
			return e;
		};
		config.result.then(function(e) {
			return a(e)
		}, function(e) {
			return a(e)
		});
		return config;
	}

	showMessageDialog(opt, callback, passedObject) {
		var url = './template/message.html',
			defaultButtonConfig = this.appDialogConfig.defaultButtonConfig;
		callback = callback || opt.callback;
		passedObject = passedObject || opt.passedObject;

		const ButtonConfig = opt.buttons || defaultButtonConfig;
		const dialogCallback=function(config) {
			config.title = opt.title;
			config.message = opt.message;
			config.buttons = angular.copy(ButtonConfig);
			// config.size = opt.size;
			config.eventHandler = function(result) {
				if (angular.isFunction(result)) {
					result();
					config.close(false);
				}else{
					config.close(result);
				}
			};
			if (angular.isFunction(callback)) {
				callback(config);
			}
		};
		// return this.showDialogByUrl(url, dialogCallback, passedObject);
		return this.showDialogByTemplate(require('./template/message.html'), dialogCallback, passedObject);
	}

	showMessageDialogSimple(title, message, buttons, passedObject){
		return this.showMessageDialog({
					title,
					message,
					buttons,
					passedObject
				});
	}

	showDialogByTemplate(template, callback, passedObject){
		let config;
		let locationChangeSuccess;
		const directiveConfig = {
			template: template,
			resolve: {
				passedObject: function() {
					return passedObject
				}
			},
			controller: function($scope, $uibModalInstance, $rootScope, $uibModalStack, passedObject) {
					 locationChangeSuccess = $scope.$on('$locationChangeSuccess', function() {
						if (config && $scope._dialogShow == 1) {
							$scope.close(false);
						}
					});
					var iconClass = 'icon-warning-2';
					if (passedObject != undefined && passedObject.iconClass) {
						iconClass = passedObject.iconClass;
					}
					var iconColor = 'text-warning';
					if (passedObject != undefined && passedObject.iconColor) {
						iconColor = passedObject.iconColor;
					}

					$scope.iconClass = iconClass + ' ' + iconColor;
					$scope._passedObject = passedObject;
					$scope._dialogShow = true;
					$scope.close = function(callback) {
						$scope._dialogShow = false;
						$uibModalInstance.close(callback);
						config = null
					};
					if (angular.isFunction(callback)) {
						callback($scope);
					}
				}
		};
		if (passedObject && passedObject.windowClass) {
			directiveConfig.windowClass = passedObject.windowClass;
		}
		if (passedObject && passedObject.size) {
			directiveConfig.size = passedObject.size;
		}
		config = this.showDialog(directiveConfig);
		var a = function(e) {
			if (locationChangeSuccess) {
				locationChangeSuccess();
			}
			return e;
		};
		config.result.then(function(e) {
			return a(e)
		}, function(e) {
			return a(e)
		});
		return config;
	}

	showConfirm(options,callback,passedObject){
		options.buttons = options.buttons || this.appDialogConfig.defaultButtonConfig;
		options.buttons[0].result = callback;
		this.showMessageDialog(options,null,passedObject);
	}
}



dialogFactory.$inject=['$rootScope', '$uibModal', '$uibModalStack', 'appDialogConfig'];



export {dialogFactory,dialogConfig}
 