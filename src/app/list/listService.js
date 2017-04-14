import g_config from '../common/config/config';

const API = {
	'DELETE': 'check/delete/{id}',
	'add': 'check',
	'find': 'check/list.json',
	'opensyncios':'check/ios/sync',
	'get_history': 'record/{id}',
}
class listServeice {
	constructor(consoleRequest, $sce, growl, $q) {
		Object.assign(this, {
			consoleRequest, $sce, growl, $q
		});
	}

	validate(name) {
		return /^[a-zA-Z0-9\-.*]+$/.test(name) || name == '';
	}

	validateThen() {
		var defer = this.$q.defer();
		defer.reject({});
		this.growl.addWarnMessage('包名包含非法字符\\、<、>...!', {
			ttl: 4000
		});
		return defer.promise;
	}

	modify(data) {
		let param = {};
		param.data = data;
		param.method = 'POST';
		if (!this.validate(data.group)) {
			return this.validateThen();
		}
		return this.consoleRequest(g_config.app_server + API.add, param);
	}

	add(data = {}) {
		let param = {};
		param.data = data;
		param.method = 'POST';
		if (!this.validate(data.group)) {
			return this.validateThen();
		}
		return this.consoleRequest(g_config.app_server + API.add, param);
	}

	del(data) {
		let param = {};
		param.data = data;
		param.method = 'post';
		let url = g_config.app_server + API.DELETE.format({
			id: data.id
		});
		delete data.id;
		delete data.type;
		return this.consoleRequest(url, param);
	}


	update(data) {
		let param = {};
		param.data = data;
		if (!this.validate(data.group)) {
			return this.validateThen();
		}
		return this.consoleRequest(g_config.app_server + API.find, param);
	}

	filterIOS(){
		let param = {};
		let url = g_config.app_server + API.opensyncios;
		return this.consoleRequest(url, param);
	}

	getHistory(data){
		let param = {};
		let url = g_config.app_server + API.get_history.format({
				id: data.id
			});;
		return this.consoleRequest(url, param);
	}
}

listServeice.$inject = ['console.request', '$sce', 'growl', '$q'];
export default listServeice;
