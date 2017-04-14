export default {
    config : {
        paginationSupport: true,
        checkboxSupport: false,
        paginationInfo: {
            pageSize: 16,
            page: 1,
            total: 1,
            showPageGoto: true
        },
        // filterItems: {
        // 	'state': []
        // },
        selectedProperty: 'selected',
        selectedScopeProperty: 'selectedItem'
    },
    columns : [
        {
            'name': '排序',
            'filedDirective': '{{$index+1}}'
        }, {
            'name': '日期',
            'filedDirective': '{{item.date |date:"yyyy-MM-dd HH:mm:ss"}}'
        }, {
            'name': '错误信息',
            'filedDirective': '{{item.error_desc}}',
            'cssProperty': 'mw80'
        }, {
            'name': '操作',
            'filedDirective': '<a href=" item.jenkins_url}}" target="_blank">详情</a>'
        }
    ],
    formFields : [],
    formData : {},
    formOptions : {
        formStyle: 'inline-block clearfix'
    },
    itemList : []
};
