import addModel from '../model/addDirective';
import delModel from '../model/delDirective';
import addTmpl from './add.html';
import delTmpl from './del.html';
import historyDetailTmpl from './historyDetail.html';
import TIP from '../../common/config/tips';
import utils from '../../common/helpers/utils';


function _filterTab(formOptions, selected) {
	return formOptions.filter((item, key) => selected.excluede.indexOf(key) > -1);
}

/**
 * 数据过滤
 * @param  {Array[Object]} rules   规则
 * @param  {Object} data    原数据
 * @param  {Array[String]} extrule 额外规则
 * @return {Data}         [description]
 */
function _filterData(rules, data, extrule) {
	let _data = {};
	rules.forEach(item => {
		_data[item.key] = data[item.key] || '';
	});
	extrule.forEach(item => {
		_data[item] = data[item] || ''
	});
	return _data;
}

/**
 * 添加
 * @param {Fn} $compile       
 * @param {Service} appDialog      dialog service
 * @param {} consoleRequest 
 */
export function add($compile, appDialog, consoleRequest) {
	return {
		scope: {
			item: '@'
		},
		restrict: 'A',
		link($scope, iElm, iAttrs, ctrl) {
			function dialogConfig(config) {
				config.loading = true;
				angular.extend(config, angular.copy(addModel));

				var item = JSON.parse(angular.copy($scope.item || '{}'));
				config.formData = item;
				config.formData.type = config.formData.type || 'android';
				config.formFields = _filterTab(config.formFields, config.tabList[config.formData.type])
				config.dialogTitle = '添加';
				config.loading = false;
				config.error = {};
				config.doAction = function() {
					let emptyProperty = config.formData.type == 'android' ? ['type'] : ['type', 'group'];
					let _data = _filterData(config.formFields, config.formData, emptyProperty);
					// _data.artifact = '';
					consoleRequest({
						serviceModule: 'listServeice',
						serviceAction: 'add',
						withoutData: true,
						params: _data
					}).then(function() {
						$scope.$emit('confList:reload', 'add')
					})['finally'](function() {
						config.close();
					}).catch(function(err) {
						config.error = err;
						// utils.showAlert(err.data);
					})
				}
				config.tabSwitch = function(tab) {
					config.formData.type = tab.id;
					config.formFields = _filterTab(angular.copy(addModel.formFields), tab) //根据类型变化数据模型
				}
			}
			iElm[0].onclick = function() {
				appDialog.showDialogByTemplate(addTmpl, dialogConfig, {});
			}

		}
	}
}

add.$inject = ['$compile', 'appDialog', 'app.console.request'];

//修改
export function modify($compile, appDialog, consoleRequest) {
	return {
		scope: {
			item: '@'
		},
		restrict: 'A',
		link($scope, iElm, iAttrs, ctrl) {
			function dialogConfig(config) {
				config.loading = true;
				angular.extend(config, angular.copy(addModel));

				var item = JSON.parse(angular.copy($scope.item || '{}'));
				config.formData = item;
				config.formData.type = item.type || 'android';
				config.formFields = _filterTab(config.formFields, config.tabList[config.formData.type])
				config.dialogTitle = '修改';
				config.loading = false;
				config.doAction = function() {
					let emptyProperty = config.formData.type == 'android' ? ['type', 'id'] : ['type', 'group', 'id'];
					let _data = _filterData(config.formFields, config.formData, emptyProperty);
					consoleRequest({
						serviceModule: 'listServeice',
						serviceAction: 'modify',
						withoutData: true,
						params: _data
					}).then(function() {
						$scope.$emit('confList:reload')
					})['finally'](function() {
						config.close();
					})
				}
				config.tabSwitch = function(tab) {
					config.formData.type = tab.id || 'android';
					config.formFields = _filterTab(angular.copy(addModel.formFields), tab) //根据类型变化数据模型
				}
			}
			iElm[0].onclick = function() {
				appDialog.showDialogByTemplate(addTmpl, dialogConfig, {});
			}
		}
	}
}

modify.$inject = ['$compile', 'appDialog', 'app.console.request'];


//删除
export function del($compile, appDialog, consoleRequest) {
	return {
		scope: {
			item: '@'
		},
		restrict: 'A',
		link($scope, iElm, iAttrs, ctrl) {
			// function doAction(config) {
			// 	var item = JSON.parse(angular.copy($scope.item || '{}'));
			// 	consoleRequest({
			// 		serviceModule: 'listServeice',
			// 		serviceAction: 'del',
			// 		params: {
			// 			id: item.id
			// 		},
			// 		withoutData: true,
			// 	}).then(function(data) {
			// 		$scope.$emit('confList:reload')
			// 	})['finally'](function() {
			// 		config.close();
			// 	})
			// }
			function dialogConfig(config) {
				config.loading = true;
				angular.extend(config, angular.copy(delModel));

				var item = JSON.parse(angular.copy($scope.item || '{}'));
				config.formData = item;
				config.formData.type = 'android';
				config.formFields = _filterTab(config.formFields, config.tabList[config.formData.type])
				config.dialogTitle = '删除';
				config.loading = false;
				config.error = {};
				config.doAction = function() {
					let emptyProperty = config.formData.type == 'android' ? ['type'] : ['type', 'group'];
					let _data = _filterData(config.formFields, config.formData, emptyProperty);
					_data.id = item.id;
					// _data.artifact = '';
					consoleRequest({
						serviceModule: 'listServeice',
						serviceAction: 'del',
						withoutData: true,
						params: _data
					}).then(function() {
						$scope.$emit('confList:reload')
					})['finally'](function() {
						config.close();
					}).catch(function(err) {
						config.error = err;
						// utils.showAlert(err.data);
					})
				}
				config.tabSwitch = function(tab) {
					config.formData.type = tab.id;
					config.formFields = _filterTab(angular.copy(addModel.formFields), tab) //根据类型变化数据模型
				}
			}
			iElm[0].onclick = function() {
				appDialog.showDialogByTemplate(delTmpl, dialogConfig, {});
				// appDialog.showConfirm(TIP['list.del'], doAction, {});
			}
		}
	}
}

del.$inject = ['$compile', 'appDialog', 'app.console.request'];

//删除
export function getHistory($compile, appDialog, consoleRequest) {
	return {
		scope: {
			item: '@'
		},
		restrict: 'A',
		link($scope, iElm, iAttrs, ctrl) {
			// function doAction(config) {
			// 	var item = JSON.parse(angular.copy($scope.item || '{}'));
			// 	consoleRequest({
			// 		serviceModule: 'listServeice',
			// 		serviceAction: 'getHistory',
			// 		params: {
			// 			data: item
			// 		},
			// 		withoutData: true,
			// 	}).then(function(data) {
			// 		$scope.$emit('confList:reload')
			// 	})['finally'](function() {
			// 		config.close();
			// 	})
			// }

			function dialogConfig(config) {
				config.loading = true;
				var item = JSON.parse(angular.copy($scope.item || '{}'));
				config.formData = [];
				config.dialogTitle = '操作记录';
				config.loading = false;
				config.error = {};

				consoleRequest({
					serviceModule: 'listServeice',
					serviceAction: 'getHistory',
					withoutData: true,
					params: {id: item.id}
				}).then(function (data) {
					config.formData = data;
				})['finally'](function () {

				}).catch(function (err) {
					config.error = err;
				})
				config.doAction = function () {

				}
			}
			iElm[0].onclick = function() {
				appDialog.showDialogByTemplate(historyDetailTmpl, dialogConfig, {});
				// appDialog.showConfirm(historyDetail, doAction, {});
			}
		}
	}
}

getHistory.$inject = ['$compile', 'appDialog', 'app.console.request'];

export function validPackageName(name) {

}


export function filters($compile, appDialog, consoleRequest, growl) {
	return {
		scope: {
			item: '@'
		},
		restrict: 'A',
		link($scope, iElm, iAttrs, ctrl) {
			function doAction(config) {
				var item = JSON.parse(angular.copy($scope.item || '{}'));
				consoleRequest({
					serviceModule: 'listServeice',
					serviceAction: 'filterIOS',
					data: true,
				}).then(function(data) {
					if (data.result == 'failed') {
						growl.addErrorMessage('iOS过滤手动开启失败,请稍后再试!', {
							ttl: 2000
						});
						return;
					}else{
						growl.addSuccessMessage('iOS过滤手动开启成功!', {
							ttl: 2000
						});
					}
					$scope.$emit('confList:reload')
				})['finally'](function() {
					config.close();
				})
			}
			iElm[0].onclick = function() {historyDetail
				appDialog.showConfirm(TIP['filter.iOS'], doAction, {});
			}
		}
	}
}

filters.$inject = ['$compile', 'appDialog', 'app.console.request', 'growl'];
