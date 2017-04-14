/**
 * yjl 2016/4/26
 */
import siderbarTmpl from './sidebar.html';
import sidebarConfigModel from '../../config/siderbar';
const navItemHeight = 36;

require('./sidebar.css');


function _setMap(data) {
	let map = {};
	angular.forEach(data, function(item, n) {
		if (item.id) {
			map[item.id] = item;
		}
	});
	return map;
}


function _makeList(siderbar, siderbarsMap) {
	let list = [];
	angular.forEach(siderbar, function(item, index) {
		let i = siderbarsMap[item];
		if (i) {
			list.push(i);
		}
	});
	return list;
}

function consoleSidebar($state, $stateParams) {
	return {
		template: siderbarTmpl,
		restrict: 'AE',
		replace: true,
		scope: {
			// products:'=siderbar'
		},
		link($scope, iElm, iAttrs, ctrl) {
			$scope.loadingState = true;
			$scope.products = $scope.products || sidebarConfigModel.siderbar;
			$scope.navTitle = $scope.navTitle || sidebarConfigModel.navTitle;
			$scope.$state = $state;
			$scope.$stateParams = $stateParams;

			function calculateHeight(items, map) {
				var len = items.length,
					currentEntry = $scope.currentEntry;
				if (items && currentEntry && angular.isDefined(map[currentEntry.id]) && items.indexOf(currentEntry.id) == -1) {
					len += 1
				}
				return len * navItemHeight;
			}

			function setPreference() {
				if (!$scope.products || !$scope.siderbarMap) {
					return;
				}
				$scope.siderbarList = _makeList($scope.products, $scope.siderbarMap);
				$scope.siderbarHeight = calculateHeight($scope.products, $scope.siderbarMap, $scope.siderbarList.length);
			}

			$scope.siderbarMap = _setMap($scope.products);
			setPreference();
			$scope.loadingState = false;
		}
	}
}

consoleSidebar.$injector = ['$state', '$stateParams'];

export default consoleSidebar;