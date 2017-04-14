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
		'name': '依赖包组名',
		'filedDirective': '{{item.group}}'
	}, {
		'name': '依赖包名称',
		'filedDirective': '{{item.artifact}}'
	}, {
		'name': '版本',
		'filedDirective': '{{item.version}}'
	}, {
		'name': '名单类型',
		'filedDirective': '{{item.list_type?"黑名单":"白名单"}}'
	}, {
		'name': '是否可用',
		'filedDirective': '{{item.enable?"可用":"不可用"}}'
	}, {
		'name': '类型',
		'filedDirective': '{{item.type}}'
	}, {
		'name': '产品类型',
		'filedDirective': '{{item.nd_produce==1?"nd自产":"第三方"}}'
	}, {
		'name': '操作',
		'filedDirective': '<list-event item="item" ></list-event>'
	}],
	formFields: [{
			"key": "group",
			"type": "text",
			"label": "依赖包组名",
			"labelWidth": "col-sm-5",
			"formItemWidth": "col-sm-7 padding-clear",
			"placeholder": "请输入包名"
		}, {
			"key": "artifact",
			"type": "text",
			"label": "依赖包名称",
			"labelWidth": "col-sm-5",
			"formItemWidth": "col-sm-7 padding-clear",
		}, {
			"key": "list_type",
			"type": "select",
			"label": "名单类型",
			"labelWidth": "col-sm-6",
			"formItemWidth": "col-sm-6 padding-clear",
			'options': [{
				value: '',
				name: '请选择',
				selected: true
			},{
				value: '0',
				name: '白名单',
			}, {
				value: '1',
				name: '黑名单'
			}]
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
		//  {
		// 	"key": "type",
		// 	"type": "select",
		// 	"labelWidth": "col-sm-3",
		// 	"label": "类型",
		// 	"formItemWidth": "form-control-wrap",
		// 	options:[{
		// 		value:'',
		// 		name:'所有类型',
		// 		selected:true
		// 	},{
		// 		value:'ios',
		// 		name:'ios'
		// 	},{
		// 		value:'android',
		// 		name:'android'
		// 	}]
		// }, 
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
