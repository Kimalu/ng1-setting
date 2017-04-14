export default function listEvent(){
	return{
		scope:{item:'='},
		template:`<a href="javascript:;" modify-list class="btn btn-sm" item="{{item}}">修改</a>
		<a href="javascript:;" del-list class="btn" item="{{item}}">删除</a>
		<a href="javascript:;" get-history class="btn" item="{{item}}">操作记录</a>`
	}
} 
