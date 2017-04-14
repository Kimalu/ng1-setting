import TIP from '../../common/config/tips';
import utils from '../../common/helpers/utils';
import helper from '../helper';
/**/
export default class monitoringCtrl {
	constructor({request, appDialog, $scope,TableConfig}) {
		Object.assign(this, {
			request, appDialog, $scope
		});
		angular.extend(this, TableConfig)
		this.pageInfo = TableConfig.config.paginationInfo;
		utils.init(appDialog);
		this.formData = {};
		let me = this;
		this.onSubmit = function(data) {
			me.updateRequestParams(data);
		}
	}

	updateRequestParams(params = {}) {
		angular.extend(params, this.formData);
		params = helper.setKey(params, false, '')
		params.page = params.currentPage || this.pageInfo.page;
		params.size = params.pageSize || this.pageInfo.pageSize;
		delete params.currentPage;
		delete params.pageSize;
		this.update(params);
	}

	// update(data) {
	// 	this.loading = true;
	// 	this.request.findEnvCheck(data)
	// 		.then((res) => {
	// 			this.rerender(res.data);
	// 		})
	// 		.catch((err) => {
	// 			this.rerender(err.data || {});
	// 		});
	// }

	rerender(data) {
		this.loading && (this.loading = false);
		this.itemList = data.content || [];
		data.number && (this.pageInfo = helper.pageHandler(data));
	}

	updateModel(model) {
		let me = this;
		return function(model) {
			me.updateRequestParams(model.data.params);
		}
	}

}

// monitoringCtrl.$inject = ['commonJenkinsService', 'appDialog', '$scope'];
