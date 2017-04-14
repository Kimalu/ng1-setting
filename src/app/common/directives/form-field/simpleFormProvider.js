//config simple form 
class simpleFormConfig{
	constructor(){
		this.typeHandlerMap = {};
	}
	addCustomHandler (name, customHandler) {
		if (this.typeHandlerMap[name]) {
			throw new Error('Duplicate type name: ' + name);
		}
		this.typeHandlerMap[name] = customHandler;
	}

	getCustomHandlerMap (name) {
		return this.typeHandlerMap;
	}

}

class simpleFormConfigProvider{
	$get(){
		return new simpleFormConfig();		
	}
}


export default simpleFormConfigProvider;