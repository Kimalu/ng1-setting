import states from './state';
import listCtrl from './listCtrl';
import listService from './listService';
import {
    add, modify, del, filters,getHistory
}
    from './directives/add';
import {
    userDefinedAdd, userDefinedModify, userDefinedDel, checkNamespace, checkBizName
} from './directives/userDefinedAdd'
import listDetail from './directives/listDetail';

import listEvent from './directives/listEvent';
import appServerEvent from './directives/appServerEvent';
import appDetailEvent from './directives/appDetailEvent';
import userDefinedEvent from './directives/userDefinedEvent'
//...app list


//jeckins
//
import commonJenkinsService from './monitoring/env_check/listService';
import EnvCheckCtrl from './monitoring/env_check/listCtrl';
import JekinsCheckCtrl from './monitoring/jenkins/listCtrl';
import ValidationRecordCtrl from './monitoring/validation_record/listCtrl';
import JenkinsHttpCtrl from './monitoring/jenkins_http/listCtrl';


require('./list.css');

/**
 * listConsole Module
 *
 * Description
 */
angular.module('listConsole', [])
    .directive('addList', add)
    .directive('modifyList', modify)
    .directive('getHistory', getHistory)
    .directive('delList', del)
    .directive('filterList', filters)
    .directive('listDetail', listDetail)
    .directive('listEvent', listEvent)
    .directive('appServerEvent', appServerEvent)
    .directive('appDetailEvent', appDetailEvent)
    .directive('userDefinedEvent', userDefinedEvent)
    .service('listService', listService)
    .controller('listCtrl', listCtrl)
    .controller('EnvCheckCtrl', EnvCheckCtrl)
    .controller('JekinsCheckCtrl', JekinsCheckCtrl)
    .controller('ValidationRecordCtrl', ValidationRecordCtrl)
    .controller('JenkinsHttpCtrl', JenkinsHttpCtrl)
    .service('commonJenkinsService', commonJenkinsService)
    .directive('checkNamespace', checkNamespace)
    .directive('checkBizName', checkBizName)
    .directive('userDefinedAdd', userDefinedAdd)
    .directive('userDefinedModify', userDefinedModify)
    .directive('userDefinedDel', userDefinedDel)
    .config(states);


export default {
    name: 'listConsole'
};
