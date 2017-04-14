/**
 * yjl
 * 2016/4/5
 */
import to_trusted from './construct';
// import evtNameFilter from './evtName';
// import selectNameFilter from './selectName';
// import visionNameFilter from './visionName';

const common = angular.module('app.common.filters', []);
common
	.filter('to_trusted',to_trusted) //html $sce 转义
	// .filter('evt_name',evtNameFilter) //form field  event name  过滤
	// .filter('select_name',selectNameFilter) //form field  event name  过滤
	// .filter('version_name',visionNameFilter) //version  过滤