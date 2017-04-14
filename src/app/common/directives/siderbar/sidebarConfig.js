
import sidebarConfigModel from '../../config/siderbar';

class sidebarConfig{
	constructor(){
		this.sidebaConfig = sidebarConfigModel;
	}

	$get(){
		return this.sidebarConfig;
	}
}


export default sidebarConfig;