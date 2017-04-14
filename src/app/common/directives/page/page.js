import pageTmpl from './page.html';

require('./page.css');
const i18nMessage = {};
i18nMessage.localMessage = {
	total: '共有',
	item: '条',
	perPage: '每页显示：'
};

export default function consolePagination($compile){
	return {
		restrict: 'AM',
		scope: {
			paginationInfo: '=',
			maxSize: '=',
			onSelectPage: '&'
		},
		replace: true,
		template: pageTmpl,
		transclude: false,
		link($scope, iElm, iAttrs, paginationCtrl) {
			var showPageGotoSet = iAttrs.showPageGoto == 1 || iAttrs.showPageGoto == 'true';
			// showPageGotoSet = showPageGotoSet|| $scope.showPageGoto;
			$scope.$watch('paginationInfo', function(paginationInfo) {
				if (paginationInfo && showPageGotoSet) {
					var total = paginationInfo.total,
						pageSize = paginationInfo.pageSize,
						totalPage = Math.ceil(total / pageSize);
					paginationInfo.totalPage = totalPage;
					paginationInfo.showPageGoto = totalPage >= 5;
					$scope.pageGoto = '';
				}
			});

			$scope.$watch('pageGoto', function(page) {
				if (page && page != '0' && page > 0) {
					$scope.gotoPageBtnDisabled = page > $scope.paginationInfo.totalPage;
				} else {
					$scope.gotoPageBtnDisabled = true;
				}
			});
			$scope.gotoPage = function() {
				$scope.pageChangedHandler($scope.pageGoto);
			};
			$scope.pageChangedHandler = function(page) {
				$scope.onSelectPage({
					page: page
				});
			};
			$scope.i18nMessage = i18nMessage.localMessage;
		}
	}

}

consolePagination.$injector=['$compile'];