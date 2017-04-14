export default {
	formFields: [
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
		}
	],
	formOptions: {
		uniqueFormId: 'delForm'
	},
	formData: {},
	tabList: {
		android: {
			id: 'android',
			value: 'Android',
			excluede: [0, 1]
		}
	},
	type:'android'
};
