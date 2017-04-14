export default {
	pageHandler(pageInfo) {
			return {
				pageSize: pageInfo.size,
				page: pageInfo.number,
				total: pageInfo.total_elements,
				showPageGoto: true
			}
		},
		setKey(obj = {}, isInit, content = '') {
			Object.keys(obj).forEach((item) => {
				!isInit ? typeof obj[item] == 'undefined' && (obj[item] = content) : (obj[item] = content);
			});
			return obj;
		}
}

