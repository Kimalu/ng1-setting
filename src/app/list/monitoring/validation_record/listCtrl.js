import TableConfig from '../model/validation_record';
import monitoringCtrl from '../commonCtrl';
/**/
export default class ValidationRecordCtrl extends monitoringCtrl{
	constructor(request, appDialog, $scope) {
		super({
			request, appDialog, $scope,TableConfig
		})
		Object.assign(this, {
			request, appDialog, $scope
		});
	}
	update(data) {
		this.loading = true;
		this.request.findValidationRecord(data)
			.then((res) => {
				this.rerender(res.data);
			})
			.catch((err) => {
				this.rerender(err.data || {});
			});
	}
}

ValidationRecordCtrl.$inject = ['commonJenkinsService', 'appDialog', '$scope'];
