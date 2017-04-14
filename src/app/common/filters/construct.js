//filter $sce
function to_trusted($sce){
	return  (text) => $sce.trustAsHtml(text)
}
to_trusted.$injector=['$sce'];

export default to_trusted;