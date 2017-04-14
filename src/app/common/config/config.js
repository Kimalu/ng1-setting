const dev_config = {
	"app_server": "mock/",
	"jenkins_monitor": "",
}
const test_config = {
    "app_server": "",
    "jenkins_monitor": "",
}

const aws_config={};



let  g_config = angular.copy(dev_config);
if (window.location.href.indexOf('dev.web.nd') > -1) {
    g_config = dev_config;
}
if (window.location.href.indexOf('debug.web.nd') > -1) {
    g_config = test_config;
}


export default g_config;
