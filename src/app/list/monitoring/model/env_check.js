import commonConfig from './common';

let config = angular.copy(commonConfig);
config.columns.pop();//移除操作
config.formFields = [
    {
        "key": "error_desc",
        "type": "select",
        "label": "构建主机:",
        "labelWidth": "col-sm-6",
        "formItemWidth": "col-sm-6 padding-clear",
        'options': [
            {
                value: '',
                name: '请选择',
                selected: true
            }, {
                value: 'Mac-133.110',
                name: 'Mac-133.110'
            }, {
                value: 'Mac-133.170',
                name: 'Mac-133.170'
            }, {
                value: 'Mac-133.179',
                name: 'Mac-133.179'
            }, {
                value: 'Linux-133.38',
                name: 'Linux-133.38'
            }, {
                value: 'Linux-133.73',
                name: 'Linux-133.73'
            }, {
                value: 'Linux-133.184',
                name: 'Linux-133.184'
            }
        ]
    },{
			"key": "查询",
			"type": "submit",
			"formItemWidth": "form-control-wrap text-right"
		}
]

export default config;
