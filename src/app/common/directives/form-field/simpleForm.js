const inputType = {
	textarea: 'textarea',
	text: 'input',
	radio: 'input',
	checkbox: 'checkbox',
	image: 'input',
	submit: 'input',
	number: 'input',
	bool: 'boolean',
	evt: 'event',
	select: 'select',
	param: 'param'
}

const URLTYPE = {
	string: 'text',
	'int': 'number',
	page: 'select',
	'page_level_1': 'select',
	'boolean': 'bool',
	'map': 'param'
}


function isHasOwnProperty(objects) {
	for (let item in objects) {
		if (objects.hasOwnProperty(item)) {
			return false;
		}
	}
	return true;
}



class oprationTemplateClass {
	constructor() {
		this.templateUrls = {};
		this.templates = {};
	}

	setTemplateUrl(name, value) {
		if (typeof name == 'string') {
			this.templateUrls[name] = value;
		} else {
			var self = this;
			angular.forEach(name, function(value, name) {
				self.templateUrl(name, value);
			});
		}
	}

	setTemplate(name, value) {
		if (typeof name == 'string') {
			this.templates[name] = value;
		} else {
			var self = this;
			angular.forEach(name, function(value, name) {
				self.template(name, value);
			});
		}
	}

	getTemplateUrl(name) {
		return this.templateUrls[name]
	}

	getTemplate(name) {
		return this.templates[name];
	}

}



/**
 * function oprationTemplate
 */
var oprationTemplate = new oprationTemplateClass();

for (let type in inputType) {
	oprationTemplate.setTemplate(type, require('./formFields/formly-field-' + type + '.html'));
	// oprationTemplate.setTemplate(type + '-multi', require('./formFields/formly-field-' + type + '-multi.html'));
}


//directive simple form
function simpleFormDirective() {
	return {
		restrict: 'AE',
		template: require('./simpleForm.html'),
		replace: true,
		transclude: true,
		scope: {
			fields: '=',
			options: '=?',
			result: '=',
			formOnParentScope: '=name',
			onSubmit: '='
		},
		compile: function() {
			return {
				post: function(e, t, n) {
					e.formOnParentScope = e[n.name]
				}
			};
		},
		controller: function($scope, $element, $parse) {
			$scope.options.uniqueFormId = $scope.options.uniqueFormId || '';
		}
	}
}

//directive simple form custom attrs
function simpleFormCustomAttrsDirective() {
	return {
		restrict: 'AE',
		link
	}

	function link($scope, iElm, iAttrs) {
		var simpleFormCustomAttrs = iAttrs.simpleFormCustomAttrs || '{}';
		try {
			simpleFormCustomAttrs = JSON.parse(simpleFormCustomAttrs);
			if (!isHasOwnProperty(simpleFormCustomAttrs)) {
				for (let simpleAttr in simpleFormCustomAttrs) {
					if (simpleFormCustomAttrs.hasOwnProperty) {
						iElm.attr(simpleAttr, simpleFormCustomAttrs[simpleAttr]);
					}
				}
			}
		} catch (s) {
			console.error(s)
		}
	}
}

//directive simple form custom attrs
function formlyDynamicNameDirective() {
	return {
		restrict: 'AE',
		priority: 599,
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
			$element.removeAttr('formly-dynamic-name');
			$attrs.$set('name', $scope.$eval($attrs.formlyDynamicName));
			delete $attrs.formlyDynamicName;
		}]
	}
}


//Directive  Form Field 
function formlyFieldDirective($http, $compile, $templateCache, $simpleFormConfig) {
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			optionsData: '&options',
			formId: '=formId',
			index: '=index',
			result: '=formResult',
			sortIndex: '=',
			formScope: '=',
			onSubmitHandle: '=',
			multi: '=',
			// resultName:'='
		},
		link,
		controller: controllerFormly
	}

	//controller
	function controllerFormly($scope) {
		var timeSamp = (new Date).getTime().toString(36);

		function setResult(keys) {
			if ($scope.multi) {
				angular.extend($scope.result[$scope.sortIndex], keys);
			} else {
				angular.extend($scope.result, keys);
			}
		}

		function staticResult() {
			let keys = {};
			keys[$scope.options.key] = $scope.options.value;
			setResult(keys);
		}

		function checkboxResult() {
			let keys = {};
			keys[$scope.options.key] = {};
			setResult(keys);
		}

		function radioResult() {
			var keys = {},
				n = $scope.options.options.filter(function(e) {
					return e.checked == 1;
				});
			keys[$scope.options.key] = n[0].value;
			setResult(keys);
		}

		function booleanResult() {
			let keys = {};
			keys[$scope.options.key] = $scope.options.value || '';
			setResult(keys);
		}

		function imageResult() {
			let keys = {};
			keys[$scope.options.key] = $scope.options.value;
			setResult(keys);
		}

		function selectResult() {
			let selectValue = $scope.options.options.filter((item) => item.selected==1)[0];

			let defaultOptions = $scope.options.defaultOptions;
			if (!selectValue) {
				$scope.options.options.unshift({
					name: defaultOptions && defaultOptions.name || formMessage.select,
					marker: '_self_add_' + timeSamp
				});
				selectValue = $scope.options.options[0];
			}
			let keys = {};

			keys[$scope.options.key] = selectValue.value;
			setResult(keys);
		}



		$scope.options = $scope.optionsData();
		let type = $scope.options.type.toLowerCase();
		if (type === 'submit') {
			$scope.onSubmit = function(t) {
				$scope.onSubmitHandle.call(null, t);
			}
		}

		if (type === 'int') {
			try {
				if ($scope.multi) {
					$scope.result[$scope.sortIndex][$scope.options.key] = +$scope.result[$scope.sortIndex][$scope.options.key]
				} else {
					$scope.result[$scope.options.key] = +$scope.result[$scope.options.key];
				}
			} catch (e) {}


		}

		if (!type && $scope.options.template) {
			type = 'template';
		} else {
			if (!type && $scope.options.templateUrl) {
				type = 'templateUrl';
			}
		}
		if (type === 'select' && !angular.isArray($scope.options.options)) {
			throw new Error('options must be an Array');
		}

		if (type === 'bool') {
			if ($scope.multi) {
				$scope.result[$scope.sortIndex][$scope.options.key] = '' + ($scope.result[$scope.sortIndex][$scope.options.key] || '');
			} else {
				$scope.result[$scope.options.key] = '' + ($scope.result[$scope.options.key] || '');
			}
		}

		let isSetResult;

		if ($scope.multi) { //多个
			isSetResult = typeof$scope.result[$scope.sortIndex][$scope.options.key] =='undefined';
		} else {
			isSetResult = typeof $scope.result[$scope.options.key]=='undefined';
		}

		type = URLTYPE[$scope.options.type] || type;

		if (isSetResult) {
			switch (type) {
				case 'text':
				case 'static':
				case 'number':
					staticResult();
					break;
				case 'bool':
					booleanResult();
					break;
				case 'checkbox':
				case 'param':
				case 'evt':
					checkboxResult();
					break;
				case 'radio':
					radioResult();
					break;
				case 'select':
					selectResult();
					break;
				case 'image':
					imageResult();
					break;
				default:
					// staticResult();
					($simpleFormConfig.getCustomHandlerMap()[type] || angular.noop)($scope);
			}
		}

		$scope.id = $scope.formId + type + $scope.index;
		$scope.$on('$destroy', function() {
			if (type === 'select') {
				let options = $scope.options.options[0];
				try {
					if (options.marker === '_self_add_' + timeSamp) {
						$scope.options.options = $scope.options.options.slice(1);
					}
				} catch (e) {
					console.warn('select options is warn');
				}
			}
		})
	}

	function lowerCaseString(str) {
		return str.replace(/([A-Z])/g, function(str, value) {
			return '-' + value.toLowerCase()
		});
	}


	//link
	function link($scope, iElm, iAttrs) {

		function fillTemplate(data) {
			iElm.html(data);
			let _input = iElm.contents().find(inputType[type]);
			if (_input.length) {
				let attributes = $scope.options.attributes;
				if (attributes && attributes.length) {
					angular.forEach(attributes, function(attr) {
						let arrayAttr = attr.split('=');
						_input.attr(arrayAttr[0], arrayAttr[1] && arrayAttr[1].replace(/^["']|['"]$/g, '') || '');
					});
				}

				let validators = $scope.options.validators;
				if (validators && validators.length) {
					if (!angular.isArray(validators)) {
						validators = [validators];
					}
					angular.forEach(validators, function(item) {
						let arrayValidator = item.validator.split('=');
						_input.attr(lowerCaseString(arrayValidator[0]), arrayValidator[1] && arrayValidator[1].replace(/^["']|['"]$/g, '') || '');
					})
				}
			}

			$compile(iElm.contents())($scope);
		}
		let type = URLTYPE[$scope.options.type] || $scope.options.type;
		let template = $scope.options.template || oprationTemplate.getTemplate(type);

		if ($scope.multi) {
			fillTemplate(oprationTemplate.getTemplate(type + '-multi'));
		} else {
			fillTemplate(template);
		}

	}
}


formlyFieldDirective.$injector = ['$http', '$compile', '$templateCache', '$simpleFormConfig'];

function stringToNumberDirective() {
	return {
		// scope:{
		// 	model:'=ngModel'
		// },
		require: 'ngModel',
		link: function($scope, element, attrs, ngModelCtrl) {

			ngModelCtrl.$parsers.push(function(value) {
				return '' + value;
			});

			ngModelCtrl.$formatters.push(function(value) {
				return parseInt(value, 10);
			});

			element[0].onkeydown = function(evt) {
				evt = evt || window.event;
				let code = evt.keyCode || evt.which;
				if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) { //0-9 大小写键盘
					return isNaN(parseInt(this.value, 10)) ? '' : '' + parseInt(this.value, 10);
				}
				if ((code === 109 || code == 189) && this.value.length == 0) { //-
					return '-';
				}
				if (code == 229) { //输入法导致
					this.value = '';
					return isNaN(parseInt(this.value, 10)) ? '' : '' + parseInt(this.value, 10);
				}
				if (code == 8) { //del 
					return true;
				}
				return false;
			}
		}
	};
}


export {
	simpleFormDirective, simpleFormCustomAttrsDirective, formlyDynamicNameDirective, formlyFieldDirective, stringToNumberDirective
};