/**
 * 侧边栏配置文件
 */

export default
{
    'siderbar': [{
        'url': 'list',
        'id': 'template',
        'short': '',
        'title': '名单设置'
    }, {
        'url': 'env_check',
        'id': 'env_check',
        'short': '',
        'title': 'jenkins构建环境版本监控'
    }, {
        'url': 'jenkins',
        'id': 'jenkins',
        'short': '',
        'title': 'jenkins服务监控'
    }, {
        'url': 'validation_record',
        'id': 'validation_record',
        'short': '',
        'title': '后台服务api监控'
    }, {
        'url': 'jenkins_http',
        'id': 'jenkins_http',
        'short': '',
        'title': '服务http监控'
      }],
    'siderbarPreference': ['template','env_check','jenkins','validation_record','jenkins_http'],
    'navTitle':'设置'
}
