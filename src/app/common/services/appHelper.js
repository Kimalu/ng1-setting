 module.export = class appUtils {

 	/**
 	 * alert 错误提示
 	 */
 	showAlert(error) {
 		let opt = {
 			title: '提示',
 			message: error.msg || error.message
 		};
 		this.appDialog.showMessageDialog(opt);
 	}
 }