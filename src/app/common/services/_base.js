import {
	dialogFactory, dialogConfig
}
from './dialog';
// import UploadService from './upload-file-service';
import helper from './helper';
import appUtils from './appHelper';
import commonError from './commonError';
import commonTopicService from './commonTopicService';
import {httpErrorHanlder,consoleRequestWrapper,consoleHttpInterceptor,consoleRequest,configHttpProvider,consoleSetting,consoleConf,appConsoleRequest} from './httpHandler';
const common = angular.module(['app.common.services'], []);

common.provider('appDialogConfig', dialogConfig)
	.service('appDialog', dialogFactory)

	.factory('commonTopicService', commonTopicService)
	.factory('consoleHttpInterceptor', consoleHttpInterceptor)
	.factory('consoleRequestWrapper', consoleRequestWrapper)
	.factory('app.console.request', appConsoleRequest)
	.service('console.request', consoleRequest)
	.constant('consoleConf',consoleConf)
	.provider('consoleSetting', consoleSetting)
	// .run(commonError)
	// .config('$httpProvider', configHttpProvider)
	.run(httpErrorHanlder);


	// .service('UploadService', UploadService)