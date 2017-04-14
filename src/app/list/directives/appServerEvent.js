export default function appServerEvent(){
	return{
		scope:{item:'='},
		template:`
		<a ui-sref="appListDetail({app_name:item.app_name})" class="btn">详情</a>`
	}
} 
