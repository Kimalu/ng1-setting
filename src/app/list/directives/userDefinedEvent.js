export default function listEvent(){
	return{
		scope:{item:'='},
		template:`<a href="javascript:;" user-defined-modify class="btn btn-sm" item="{{item}}">修改</a>
		<a href="javascript:;" user-defined-del class="btn" item="{{item}}">删除</a>`
	}
} 
