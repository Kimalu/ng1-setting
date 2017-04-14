
import listTmpl from './list.html';
// import appListTmpl from './applist/list.html';
// import listDetailTmpl from './applist/list-detail.html';
// import appListDetailTmpl  from './app-list-detail/detail.html';
// import reverseDependTmpl  from './reverse-depend/reverseDepend.html';
import EnvCheckTmpl from './monitoring/env_check/index.html';
import JekinsTmpl from './monitoring/jenkins/index.html';
import ValidationRecordTmpl from './monitoring/validation_record/index.html';
import JenkinsHttpTmpl from './monitoring/jenkins_http/index.html';
// import userDefinedTmpl from './user-defined/list.html';

 export default function urlRouter($stateProvider,$urlRouterProvider){
		$stateProvider.state('list', {
			url: '/',
			template: listTmpl,
			controller: 'listCtrl as vm'
		}).state('env_check',{
			url: '/env_check',
			template: EnvCheckTmpl,
			controller: 'EnvCheckCtrl as vm'
		}).state('jenkins',{
			url: '/jekins',
			template: JekinsTmpl,
			controller: 'JekinsCheckCtrl as vm'
		}).state('validation_record',{
			url: '/validation',
			template: ValidationRecordTmpl,
			controller: 'ValidationRecordCtrl as vm'
		}).state('jenkins_http',{
			url: '/jenkinshttp',
			template: JenkinsHttpTmpl,
			controller: 'JenkinsHttpCtrl as vm'
		});

		$urlRouterProvider.otherwise('/');
}


urlRouter.$injector=['$stateProvider,$urlRouterProvider']
