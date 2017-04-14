import addModel from '../model/user-defined-add-config';
import addTmpl from './add.html';
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
        _data[item.key] = typeof (data[item.key]) !== 'undefined' ? data[item.key] : '';
    });
    extrule.forEach(item => {
        _data[item] = typeof (data[item]) !== 'undefined' ? data[item] : '';
    });
    return _data;
}
/**
 * 添加
 * @param {Fn} $compile
 * @param {Service} appDialog      dialog service
 * @param {} consoleRequest
 */
export function userDefinedAdd($compile, appDialog, consoleRequest) {
    return {
        scope: {
            item: '@',
            namespace: '@',
            bizName: '@',
            label: '@'
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
                config.formData.namespace = $scope.namespace
                config.formData.bizName = $scope.bizName
                config.formData.label = $scope.label
                config.formData.listType = '0'
                config.doAction = function () {
                    let emptyProperty = config.formData.type == 'android' ? ['type'] : ['type', 'group'];
                    let _data = _filterData(config.formFields, config.formData, emptyProperty);
                    // _data.artifact = '';
                    consoleRequest({
                        serviceModule: 'userDefinedServeice',
                        serviceAction: 'add',
                        withoutData: true,
                        params: _data
                    }).then(function () {
                        $scope.$emit('userDefinedAdd:reload', 'add')
                    })['finally'](function () {
                        config.close();
                    }).catch(function (err) {
                        config.error = err;
                        // utils.showAlert(err.data);
                    })
                }
                config.tabSwitch = function (tab) {
                    config.formData.type = tab.id;
                    config.formFields = _filterTab(angular.copy(addModel.formFields), tab) //根据类型变化数据模型
                    // if (config.formData.enable + '' === '0') {
                    //     // 不可用
                    //     const length = config.formFields.length
                    //     config.formFields.splice(length - 3, 1) //删除可选域
                    // }
                }
                // config.$watch('formData.enable', function (newValue, oldValue) {
                //     if (newValue + '' === '0' && oldValue + '' === '1') {
                //         // 不可用
                //         const length = config.formFields.length
                //         config.formFields.splice(length - 3, 1) //删除可选域
                //     } else if (newValue + '' === '1' && oldValue + '' === '0') {
                //         const length = config.formFields.length
                //         config.formFields.splice(length - 2, 0, addModel.formFields[addModel.formFields.length - 3]) //恢复可选域
                //     }
                // })
            }

            iElm[0].onclick = function () {
                appDialog.showDialogByTemplate(addTmpl, dialogConfig, {size :'back-drop-false'});
            }
        }
    }
}

userDefinedAdd.$inject = ['$compile', 'appDialog', 'app.console.request'];

//修改
export function userDefinedModify($compile, appDialog, consoleRequest) {
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
                item.bizName = item.biz_name
                config.formData = item;
                config.formData.type = item.type || 'android';
                config.formFields = _filterTab(config.formFields, config.tabList[config.formData.type])
                config.dialogTitle = '修改';
                config.formData.listType = '0'
                config.loading = false;
                config.doAction = function () {
                    let emptyProperty = config.formData.type == 'android' ? ['type', 'id'] : ['type', 'group', 'id'];
                    let _data = _filterData(config.formFields, config.formData, emptyProperty);
                    consoleRequest({
                        serviceModule: 'userDefinedServeice',
                        serviceAction: 'modify',
                        withoutData: true,
                        params: _data
                    }).then(function () {
                        $scope.$emit('userDefinedAdd:reload')
                    })['finally'](function () {
                        config.close();
                    })
                }
                config.tabSwitch = function (tab) {
                    config.formData.type = tab.id || 'android';
                    config.formFields = _filterTab(angular.copy(addModel.formFields), tab) //根据类型变化数据模型
                    // if (config.formData.enable + '' === '0') {
                    //     // 不可用
                    //     const length = config.formFields.length
                    //     config.formFields.splice(length - 3, 1) //删除可选域
                    // }
                }
                config.$watch('formData.enable', function (newValue, oldValue) {
                    // if (newValue + '' === '0') {
                    //     // 不可用
                    //     const length = config.formFields.length
                    //     config.formFields.splice(length - 3, 1) //删除可选域
                    // } else if (newValue + '' === '1' && oldValue + '' === '0') {
                    //     const length = config.formFields.length
                    //     config.formFields.splice(length - 2, 0, addModel.formFields[addModel.formFields.length - 3]) //恢复可选域
                    // }
                })
            }

            iElm[0].onclick = function () {
                appDialog.showDialogByTemplate(addTmpl, dialogConfig, {size :'back-drop-false'});
            }
        }
    }
}

userDefinedModify.$inject = ['$compile', 'appDialog', 'app.console.request'];


//删除
export function userDefinedDel($compile, appDialog, consoleRequest) {
    return {
        scope: {
            item: '@'
        },
        restrict: 'A',
        link($scope, iElm, iAttrs, ctrl) {
            function doAction(config) {
                var item = JSON.parse(angular.copy($scope.item || '{}'));
                consoleRequest({
                    serviceModule: 'userDefinedServeice',
                    serviceAction: 'del',
                    params: {
                        id: item.id
                    },
                    withoutData: true,
                }).then(function (data) {
                    $scope.$emit('userDefinedAdd:reload')
                })['finally'](function () {
                    config.close();
                })
            }

            iElm[0].onclick = function () {
                appDialog.showConfirm(TIP['list.del'], doAction, {size :'back-drop-false'});
            }
        }
    }
}

userDefinedDel.$inject = ['$compile', 'appDialog', 'app.console.request'];


//查看历史记录
export function userDefinedHistory($compile, appDialog, consoleRequest) {
    return {
        scope: {
            item: '@'
        },
        restrict: 'A',
        link($scope, iElm, iAttrs, ctrl) {
            function doAction(config) {
                var item = JSON.parse(angular.copy($scope.item || '{}'));
                consoleRequest({
                    serviceModule: 'userDefinedServeice',
                    serviceAction: 'getHistory',
                    params: {
                        id: item.id
                    },
                    withoutData: true,
                }).then(function (data) {
                    $scope.$emit('userDefinedAdd:reload')
                })['finally'](function () {
                    config.close();
                })
            }

            iElm[0].onclick = function () {
                appDialog.showConfirm(TIP['list.del'], doAction, {size :'back-drop-false'});
            }
        }
    }
}

userDefinedHistory.$inject = ['$compile', 'appDialog', 'app.console.request'];

// 命名空间合法性校验
export function checkNamespace() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link($scope, iElm, iAttrs, ctrl) {
            ctrl.$parsers.push(function (val) {
                var reg = new RegExp("^[a-z][a-z0-9.]*$");
                var result1 = reg.test(val)
                var result2 = val.length >=3 && val.length <= 128
                var isVali = !!(result1 & result2)
                ctrl.$setValidity('checkNamespace', isVali);
                return val;
            })
        }
    }
}
// 组件名称合法性校验
export function checkBizName() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link($scope, iElm, iAttrs, ctrl) {
            ctrl.$parsers.push(function (val) {
                var reg = new RegExp("^[a-z][a-z0-9\-]*$");
                var result1 = reg.test(val)
                var result2 = val.length >=4 && val.length <= 50
                var isVali = !!(result1 & result2)
                ctrl.$setValidity('checkBizName', isVali);
                return val;
            })
        }
    }
}

export function validPackageName(name) {

}
