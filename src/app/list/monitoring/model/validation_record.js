import commonConfig from './common';

let config = angular.copy(commonConfig);
config.columns = [
    {
        'name': '排序',
        'filedDirective': '{{$index+1}}'
    }, {
        'name': '日期',
        'filedDirective': '{{item.create_time |date:"yyyy-MM-dd HH:mm:ss"}}'
    }, {
        'name': '状态',
        'filedDirective': '{{item.status}}'
    },  {
        'name': '错误信息',
        'filedDirective': '{{item.result}}',
        'cssProperty':'mw80'

    }
]

export default config;
