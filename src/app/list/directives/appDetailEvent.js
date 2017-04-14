export default function appServerEvent(){
	return{
		scope:{item:'='},
		template:`
		<a ui-sref="appListDetailID({app_name:item.app_name,id:item.id})" class="btn btn-sm" item="item.app_dependency" title="依赖详情"> 详情</a>
		<a href="javascript:;" list-detail class="btn" item="item.app_dependency"  title="依赖详情">依赖</a>
		<a href="javascript:;" list-detail class="btn" item="item.white_list"  title="白名单详情">白名单</a>
		<a href="javascript:;" list-detail class="btn" item="item.black_list"  title="黑名单详情">黑名单</a>
		<a href="javascript:;" list-detail class="btn" item="item.message" title="信息详情">信息</a>
		<a href="{{item.build_url}}"  class="btn" target="_blank">查看</a>		`
	}
} 
