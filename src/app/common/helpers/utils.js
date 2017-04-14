import TIP from '../config/tips';


export default{
	init:function(appDialog){
		Object.assign(this,{appDialog})
	},
	showAlert:function(error={}){
		   let opt = {
            title: TIP.dialog.title,
            message:error&&(error.msg || error.message||error.error) ||'系统繁忙，请稍后再试!'
        };
        this.appDialog.showMessageDialog(opt);
	}
}