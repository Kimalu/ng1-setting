export default {
	formFields: [{
            key: 'label',
            type: 'text',
            label: '组件别名',
            labelWidth: 'col-sm-3',
            formItemWidth: 'col-sm-6',
            required: true
            // validators: [{
            // 	validator: 'checkNamespace',
            // 	errorMessage: '以小写字母开头，长度3-128字符，支持英文小写字母、数字、.'
            // }]
        },{
			key: 'namespace',
			type: 'text',
			label: '命名空间',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
        	hide: true
			// required: true,
			// validators: [{
			// 	validator: 'checkNamespace',
			// 	errorMessage: '以小写字母开头，长度3-128字符，支持英文小写字母、数字、.'
			// }]
		},{
			key: 'bizName',
			type: 'text',
			label: '组件名称',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
        	hide: true
			// required: true,
			// validators: [{
			// 	validator: 'checkBizName',
			// 	errorMessage: '以小写字母开头，长度4-50字符，支持英文小写字母、数字和中划线（-）'
			// }]
		},{
			key: 'group',
			type: 'text',
			label: '依赖包组名',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
			required: true
		}, {
			key: 'artifact',
			type: 'text',
			label: '依赖包名称',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
        	required: true
		}, {
			key: 'version',
			type: 'text',
			label: '依赖包版本',
			labelWidth: 'col-sm-3',
			formItemWidth: 'col-sm-6',
        	required: true
		},
        {
            key: 'listType',
            type: 'radio',
            label: '名单类型',
            labelWidth: 'col-sm-3',
            formItemWidth: 'col-sm-6',
            options:[{
                value:'0',
                name:'白名单',
                checked:true
            }],
            hide: true
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
			excluede: [0,1,2,3,4,5,6]
		},
		ios: {
			id: 'ios',
			value: 'ios',
			excluede: [0,1,2,4,5,6]
		}
	},
	type:'android'
};