export default {
	config: {
		paginationSupport: true,
		checkboxSupport: false,
		paginationInfo: {
			pageSize: 16,
			page: 1,
			total: 1,
			showPageGoto: true
		},
		filterItems: {
			'state': []
		},
		selectedProperty: 'selected',
		selectedScopeProperty: 'selectedItem'
	},
	columns: [{
		'name': '排序',
		'filedDirective': '{{$index+1}}'
	}, {
		'name': '名称',
		'filedDirective': '{{item.app_name}}'
	}, {
		'name': 'app_id',
		'filedDirective': '{{item.app_id}}'
	}, {
		'name': '检查结果',
		'filedDirective': '{{item.result.indexOf("succes")>-1?"成功":"失败"}}'
	}, {
		'name': '时间',
		'filedDirective': '{{item.operation_time |date:"yyyy-MM-dd HH:mm:ss"}}'
	}, {
		'name': '操作',
		'filedDirective': '<app-detail-event item="item" page="paginationInfo"></app-detail-event>'
	}],
	formFields: [ {
			"key": "app_name",
			"type": "text",
			"label": "应用名称",
			"labelWidth": "col-sm-4",
			"formItemWidth": "col-sm-8 padding-clear",
		},
		{
			"key": "查询",
			"type": "submit",
			"formItemWidth": "form-control-wrap text-right"
		}
	],
	formData: {},
	formOptions: {
		formStyle: 'inline-block clearfix'
	},
	itemList: []
};

// message 异常信息
// app_dependency  依赖包
// white_list 白名单列表
// black_list 黑名单列表
