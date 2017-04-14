import commonConfig from './common';

let config = angular.copy(commonConfig);
config.columns = [
  {
		'name': '排序',
		'filedDirective': '{{$index+1}}'
	}, {
		'name': '请求',
		'filedDirective': '{{item.request_host}}'
	}, {
		'name': '点击',
		'filedDirective': '{{item.hits}}'
	}, {
		'name': '平均时间(ms)',
		'filedDirective': '{{item.average_time}}'
	},{
		'name': '最大时间(ms)',
		'filedDirective': '{{item.maximum_time}}'
	},{
		'name': '平均CPU使用时间(ms)',
		'filedDirective': '{{item.average_cpu_time}}'
	},{
		'name': '系统错误',
		'filedDirective': '{{item.system_errors}}'
	},{
		'name': '平均大小(kb)',
		'filedDirective': '{{item.average_size}}'
	}, {
		'name': '操作',
		'filedDirective': '<a href="{{item.details_info}}" target="_blank">性能</a>\
    <a href="{{item.addConsole}}" target="_blank">日志</a>\
    <a href="{{item.searchConsole}}" target="_blank">链路</a>'
	}
]
export default config;
