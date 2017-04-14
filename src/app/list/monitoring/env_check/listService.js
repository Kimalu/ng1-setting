import g_config from '../../../common/config/config';

const API = {
	'build_env_check': 'v0.1/jenkins_monitor/build_env_check/list',
	'jenkins': 'v0.1/jenkins_monitor/jenkins/list',
	'validation_record': 'v0.1/jenkins_monitor/validation_record/list',
	'http': 'v0.1/jenkins_monitor/http/list',
}

export default  class commonJenkinsService {
	constructor(consoleRequest, $q, growl) {
		Object.assign(this, {
			consoleRequest, $q, growl
		});
	}

	validate(name) {
		return /^[a-zA-Z0-9\-*]+$/.test(name) || name == '';
	}

	validateThen() {
		var defer = this.$q.defer();
		defer.reject({});
		this.growl.addWarnMessage('包含非法字符\\、<、>...!', {
			ttl: 4000
		});
		return defer.promise;
	}

	findEnvCheck(data) {
		let param = {};
		param.data = data;
		if (!this.validate(data.app_name)) {
			return this.validateThen();
		}
		return this.consoleRequest(g_config['jenkins_monitor'] + API.build_env_check, param);
	}

	findJenkins(data) {
		let param = {};
		param.data = data;
		if (!this.validate(data.app_name)) {
			return this.validateThen();
		}
		return this.consoleRequest(g_config['jenkins_monitor'] + API.jenkins, param);
	}

	findValidationRecord(data) {
		let param = {};
		param.data = data;
		if (!this.validate(data.app_name)) {
			return this.validateThen();
		}
		return this.consoleRequest(g_config['jenkins_monitor'] + API.validation_record, param);
	}
	findHttp(data) {
		let param = {};
		param.data = data;
		if (!this.validate(data.app_name)) {
			return this.validateThen();
		}
		return this.consoleRequest(g_config['jenkins_monitor'] + API.http, param);
	}

}

commonJenkinsService.$inject = ['console.request', '$q', 'growl'];
