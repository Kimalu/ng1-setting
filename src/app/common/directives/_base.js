import {
	simpleFormDirective, simpleFormCustomAttrsDirective, formlyDynamicNameDirective, formlyFieldDirective, stringToNumberDirective
}
from './form-field/simpleForm';
// import propertyDlgDirective from './dialog/propertyDlg';
// import eventDlgDirective from './dialog/eventDlg';
// import imageDlgDirective from './dialog/imageDlg';
// import paramDlgDirective from './dialog/paramDlg';
// import selectDlgDirective from './dialog/selectDlg';
// import editDlgDirective from './dialog/editDlg';
// import boolDlgDirective from './dialog/boolDlg';
import loadingDirective from './loading';
// import imageUploadDirective from './imageUpload';
import sideBarDirective from './siderbar/sidebar';
import consolePaginationDirective from './page/page';
import simpleGridDirective from './simpleGrid';
// import versionDirective from './version/version';


import simpleFormConfig from './form-field/simpleFormProvider';
import sideBarConfig from './siderbar/sidebarConfig';
import noneDataInfoTipDirective from './noneDataInfoTip';
import consoleTableSearchDirective from './tableSearch';


import {growlDirective,growlProvider} from './growl/growl';


const common = angular.module('app.common.directives', []);

common.provider('$simpleFormConfig', simpleFormConfig)
	.provider('growl',growlProvider)
	.directive('growl', growlDirective)
	.directive('simpleForm', simpleFormDirective)
	.directive('simpleFormCustomAttrs', simpleFormCustomAttrsDirective)
	.directive('formlyDynamicName', formlyDynamicNameDirective)
	.directive('formlyField', formlyFieldDirective)
	.directive('stringToNumber', stringToNumberDirective)
	.directive('simpleGrid', simpleGridDirective)
	.directive('noneDataInfoTip', noneDataInfoTipDirective)
	.directive('consoleTableSearch', consoleTableSearchDirective)
	// .directive('propertyDlg', propertyDlgDirective)
	// .directive('eventDlg', eventDlgDirective)
	// .directive('imageDlg', imageDlgDirective)
	// .directive('paramDlg', paramDlgDirective)
	// .directive('selectDlg', selectDlgDirective)
	// .directive('editDlg', editDlgDirective)
	// .directive('boolDlg', boolDlgDirective)
	.directive('appLoading', loadingDirective)
	
	// .directive('imageUpload', imageUploadDirective)
	.provider('$sideBarConfig',sideBarConfig)
	.directive('appSidebar', sideBarDirective)
	.directive('consolePagination', consolePaginationDirective)
	// .directive('appVersion', versionDirective)

// .filter('to_trusted',to_trusted)