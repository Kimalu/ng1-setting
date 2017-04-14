import growlTmpl from './grow.html';

require('./grow.css');


export function growlDirective($rootScope) {
	'use strict';
	return {
		restrict: 'A',
		template: growlTmpl,
		replace: false,
		scope: true,
		controller: function($scope, $timeout, growl) {
			var onlyUnique = growl.onlyUnique();
			$scope.messages = [];

			function addMessage(message) {
				$scope.messages.push(message);
				if (message.ttl && message.ttl !== -1) {
					$timeout(function() {
						$scope.deleteMessage(message);
					}, message.ttl);
				}
			}
			$rootScope.$on('growlMessage', function(event, message) {
				var found;
				if (onlyUnique) {
					angular.forEach($scope.messages, function(msg) {
						if (message.text === msg.text && message.severity === msg.severity) {
							found = true;
						}
					});
					if (!found) {
						addMessage(message);
					}
				} else {
					addMessage(message);
				}
			});
			$scope.deleteMessage = function(message) {
				var index = $scope.messages.indexOf(message);
				if (index > -1) {
					$scope.messages.splice(index, 1);
				}
			};
			$scope.computeClasses = function(message) {
				return {
					'alert-success': message.severity === 'success',
					'alert-error': message.severity === 'error',
					'alert-danger': message.severity === 'error',
					'alert-info': message.severity === 'info',
					'alert-warning': message.severity === 'warn'
				};
			};
		}
	};
}
growlDirective.$inject = ['$rootScope'];



class _get {
	constructor($rootScope, $filter) {
		Object.assign(this, {
			$rootScope, $filter
		});
		try {
			this.translate = $filter('translate');
		} catch (e) {}
	}
	sendMessage(text, config, severity) {
		var _config = config || {},
			message;
		message = {
			text: text,
			severity: severity,
			ttl: _config.ttl || this._ttl,
			enableHtml: _config.enableHtml || this._enableHtml
		};
		this.broadcastMessage(message);
	}
	broadcastMessage(message) {
		if (this.translate) {
			message.text = this.translate(message.text);
		}
		this.$rootScope.$broadcast('growlMessage', message);
	}
	addWarnMessage(text, config) {
		this.sendMessage(text, config, 'warn');
	}
	addErrorMessage(text, config) {
		this.sendMessage(text, config, 'error');
	}
	addSuccessMessage(text, config) {
		this.sendMessage(text, config, 'success');
	}
	addServerMessages(messages) {
		var i, message, severity, length;
		length = messages.length;
		for (i = 0; i < length; i++) {
			message = messages[i];
			if (message[_messageTextKey] && message[_messageSeverityKey]) {
				switch (message[_messageSeverityKey]) {
					case 'warn':
						severity = 'warn';
						break;
					case 'success':
						severity = 'success';
						break;
					case 'info':
						severity = 'info';
						break;
					case 'error':
						severity = 'error';
						break;
				}
				this.sendMessage(message[_messageTextKey], undefined, severity);
			}
		}
	}
}

class growlProviderClass extends _get {
	constructor($rootScope, $filter) {
		super($rootScope, $filter)
		this._messagesKey = 'messages';
		this._messageTextKey = 'text';
		this._messageSeverityKey = 'severity';
		this._onlyUniqueMessages = true;
		this._ttl = null;
		this._enableHtml = false;
		this.serverMessagesInterceptor = _serverMessagesInterceptor;
	}
	globalTimeToLive(ttl) {
		this._ttl = ttl;
	}
	globalEnableHtml(enableHtml) {
		this._enableHtml = enableHtml;
	}
	messagesKey(messagesKey) {
		this._messagesKey = messagesKey;
	}
	messageSeverityKey(messageSeverityKey) {
		this._messageSeverityKey = messageSeverityKey;
	}
	onlyUniqueMessages(onlyUniqueMessages) {
		this._onlyUniqueMessages = onlyUniqueMessages;
	}
	onlyUnique() {
		return this._onlyUniqueMessages;
	}
}



export function growlProvider() {
	return {
		$get($rootScope, $filter) {
			return new growlProviderClass($rootScope, $filter);
		}
	}
}


// _get.$injector=['$rootScope','$filter'];

function _serverMessagesInterceptor($q, growl) {
	function checkResponse(response) {
		if (response.data[_messagesKey] && response.data[_messagesKey].length > 0) {
			growl.addServerMessages(response.data[_messagesKey]);
		}
	}

	function success(response) {
		checkResponse(response);
		return response;
	}

	function error(response) {
		checkResponse(response);
		return $q.reject(response);
	}
	return function(promise) {
		return promise.then(success, error);
	};
}
_serverMessagesInterceptor.$injector = ['$q', 'growl'];