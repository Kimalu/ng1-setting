import tableSearchTmpl from './tableSearch.html';
export default function consoleTableSearch() {
    return {
        scope: {
            initAction: '&',
            clickAction: '&',
            preSelectedId: '=',
            items: '=',
            selectItem: '=?'
        },
        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
        template: tableSearchTmpl,
        transclude: true,
        replace: false,
        link: function($scope, iElm, iAttrs, controller) {
            var filterField = iAttrs.filterField;
            $scope.spmPrefix = iAttrs.spmPrefix || 67;
            $scope.isOpen = false;

            $scope.$watch('items', function(newValue) {
                if (newValue && angular.isArray(newValue)) {
                    $scope.showDropdown = $scope.items.length > 1 ? true : false;
                    $scope.selectItem = $scope.items[0];
                    if (angular.isFunction($scope.initAction)) {
                        $scope.initAction({
                            data: $scope.items
                        });
                    }
                }
            });

            $scope.$watch('selectItem', function(n) {
                if (n == undefined && angular.isArray($scope.items)) {
                    $scope.selectItem = $scope.items[0];
                }
            });

            $scope.search = function(item) {
                $scope.selectItem = item;
                if (angular.isFunction($scope.clickAction)) {
                    if (filterField != undefined) {
                        $scope.clickAction({
                            data: {
                                item: item,
                                filterField: filterField
                            }
                        });
                    } else {
                        $scope.clickAction({
                            data: item
                        });
                    }
                }
            };

            $scope.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };

        }
    };
};