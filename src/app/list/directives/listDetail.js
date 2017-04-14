import listTmpl from './list-detail.html';

function _makeArry(item) {
	return angular.isArray(item) ? item : [item];
}
/**
 * 详情
 * @param {Fn} $compile       
 * @param {Service} appDialog      dialog service
 */
export default function listDetail($compile, appDialog) {
	return {
		scope: {
			item: '=',
			title: '@'
		},
		restrict: 'A',
		link($scope, iElm, iAttrs, ctrl) {
			function dialogConfig(config) {
				config.loading = true;
				config.detail = _makeArry($scope.item).join(',\n');
				config.dialogTitle = $scope.title;
			}
			iElm[0].onclick = function() {
				appDialog.showDialogByTemplate(listTmpl, dialogConfig, {});
			}

		}
	}
}

listDetail.$inject=['$compile', 'appDialog']