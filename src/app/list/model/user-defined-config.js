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
        'name': '组件别名',
        'filedDirective': '{{item.label}}'
    }, {
		'name': '命名空间',
		'filedDirective': '{{item.namespace}}'
	}, {
		'name': '组件名称',
		'filedDirective': '{{item.biz_name}}'
	}, {
		'name': '依赖包组名 ',
		'filedDirective': '{{item.group}}'
	}, {
		'name': '依赖包名称',
		'filedDirective': '{{item.artifact}}'
	}, {
		'name': '依赖包版本',
		'filedDirective': '{{item.version}}'
	}, {
		'name': '操作',
		'filedDirective': '<user-defined-event item="item" ></user-defined-event>'
	}],
	formFields: [{
			"key": "label",
			"type": "text",
			"label": "组件别名",
			"labelWidth": "col-sm-4",
			"formItemWidth": "col-sm-8 padding-clear",
			"placeholder": "组件别名"
		},{
			"key": "group",
			"type": "text",
			"label": "依赖包组名",
			"labelWidth": "col-sm-5",
			"formItemWidth": "col-sm-7 padding-clear",
			"placeholder": "请输入依赖的组名"
		}, {
			"key": "artifact",
			"type": "text",
			"label": "依赖包名称",
			"labelWidth": "col-sm-5",
			"formItemWidth": "col-sm-7 padding-clear",
			"placeholder": "请输入依赖包名称"
		}, {
			"key": "type",
			"type": "select",
			"label": "类型",
			"labelWidth": "col-sm-5",
			"formItemWidth": "col-sm-7 padding-clear",
			'options': [{
				value: '',
				name: '请选择',
				selected: true
			},{
				value: 'android',
				name: 'android',
			}, {
				value: 'ios',
				name: 'ios'
			}]
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