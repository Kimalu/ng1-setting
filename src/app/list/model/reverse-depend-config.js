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
        'name': '业务组件别名',
        'filedDirective': '{{item.label}}'
    }, {
        'name': '业务组件名称',
        'filedDirective': '{{item.biz_name}}'
    }, {
        'name': '业务组件命名空间',
        'filedDirective': '{{item.namespace}}'
    }, {
        'name': '依赖包组名',
        'filedDirective': '{{item.group}}'
    }, {
        'name': '依赖包名称',
        'filedDirective': '{{item.artifact}}'
    }, {
        'name': '依赖包版本',
        'filedDirective': '{{item.version}}'
    }, {
        'name': '系统类型',
        'filedDirective': '{{item.type}}'
    }, {
        'name': '创建者',
        'filedDirective': '{{item.creator}}'
    }],
    formFields: [{
        "key": "label",
        "type": "text",
        "label": "组件别名",
        "labelWidth": "col-sm-4",
        "formItemWidth": "col-sm-8 padding-clear",
    }, {
        "key": "group",
        "type": "text",
        "label": "依赖包组名",
        "labelWidth": "col-sm-5",
        "formItemWidth": "col-sm-7 padding-clear",
    }, {
        "key": "artifact",
        "type": "text",
        "label": "依赖包名称",
        "labelWidth": "col-sm-5",
        "formItemWidth": "col-sm-7 padding-clear",
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
