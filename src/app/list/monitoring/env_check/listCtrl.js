import TableConfig from '../model/env_check';
import monitoringCtrl from '../commonCtrl';
/**/
export default class EnvCheckCtrl extends monitoringCtrl{
	constructor(request, appDialog, $scope) {

		super({
			request, appDialog, $scope,TableConfig
		})
		this.formData = {
			error_desc: ''
		};
	}
	update(data) {
		this.loading = true;
		this.request.findEnvCheck(data)
			.then((res) => {
				this.rerender(res.data);
			})
			.catch((err) => {
				this.rerender(err.data || {});
			});
	}
}

EnvCheckCtrl.$inject = ['commonJenkinsService', 'appDialog', '$scope'];
