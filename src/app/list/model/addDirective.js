export default {
	formFields: [{
			key: 'group',
			type: 'text',
			label: '依赖包组名',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
			placeholder: 'group',
		}, {
			key: 'artifact',
			type: 'text',
			label: '依赖包名称',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
		}, {
			key: 'version',
			type: 'text',
			label: '版本',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
		},
		{
			key: 'proposer',
			type: 'text',
			label: '申请人',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
		},
		{
			key: 'reason',
			type: 'text',
			label: '原因',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
		},
		{
			key: 'enable',
			type: 'radio',
			label: '是否可用',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
			options:[{
				value:'1',
				name:'可用',
				checked:true
			},{
				value:'0',
				name:'不可用'
			}]
		},
		{
			key: 'list_type',
			type: 'radio',
			label: '名单类型',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
			options:[{
				value:'0',
				name:'白名单',
				checked:true
			},{
				value:'1',
				name:'黑名单'
			}]
		},
		{
			key: 'nd_produce',
			type: 'radio',
			label: '产品类型',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
			options:[{
				value:0,
				name:'第三方',
			},{
				value:1,
				name:'nd自产',
				checked:true
			}]
		}
	],
	formOptions: {
		uniqueFormId: 'addForm'
	},
	formData: {},
	tabList: {
		android: {
			id: 'android',
			value: 'Android',
			excluede: [0, 1, 2,3,4,5,6,7]
		},
		ios: {
			id: 'ios',
			value: 'ios',
			excluede: [1, 2,3,4,5,6,7]
		}
	},
	type:'android'
};
