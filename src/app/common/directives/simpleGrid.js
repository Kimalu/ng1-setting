import simpleGridTempl from './simpleGrid.html';

function getTable(columns, config) {
    var theads = getThead(columns, config),
        tbodys = getTbody(columns, config),
        tfoot = getTfoot(columns, config);
    return `<table class="table table-hover">${theads}${tbodys}${tfoot}</table> `;
}

function getThead(columns, config) {
    var ths = '';
    if (config.checkboxSupport) {
        ths = getTdOrTh(true);
    }
    angular.forEach(columns, function (value, key) {
        var thClass = value.cssProperty ? `class=" ${value.cssProperty}"` : '',
            filterOptionKey = value.filterOptionKey,
            tableSearch = '',
            preSelected = '',
            updown = '';

        if (filterOptionKey) {
            tableSearch = ` console-table-search  ${preSelected}  select-item="filterItemMap.${filterOptionKey}" filter-field="${filterOptionKey}" 
            items="filterItems.${filterOptionKey}"  click-action="changeTheadFilter(data)"`
        } else {
            if (config.clientSort && value.field && value.disableSort != 1) {
                updown = ` <span class="icon-updown btn-link" data-ng-click="clientSortHandler('${value.field}', sortReverse)></span>`;
            }
        }
        if (config.serverSort && value.field && value.serverSortEnabled == 1) {
            updown = `<span class="icon-updown btn-link" data-ng-click="serverSortHandler('${value.field}', sortReverse)"></span>`;
        }
        ths += `<th ${thClass} ${tableSearch}> ${value.name } ${updown}</th>`;
    });

    return `<thead><tr>${ths}</tr></thead>`;

}

function getTbody(columns, config) {
    var bindonce = config.useBindOnce ? 'bindonce' : '',
        itemName = config.rowItemName ? config.rowItemName : 'item',
        itemList = config.itemList || 'store',
        tbodys = '';
    if (config.checkboxSupport) {
        config.selectedScopeProperty = config.selectedScopeProperty || 'selectedItems';
        var ngModelItem = itemName + '.' + config.selectedProperty,
            checkboxDisabled = config.checkboxDisabledProperty,
            ngDisabled = '';
        if (checkboxDisabled) {
            ngDisabled = `data-ng-disabled="${itemName}.${checkboxDisabled}"`;
        }
        tbodys = `<td width="10"><input type="checkbox"  ${ngDisabled} data-ng-model="${ngModelItem}" ng-change="changeSelection({data: ${itemName}})"/></td>`;
    }
    angular.forEach(columns, function (item) {
        var tdContent = getTruncateText(item, itemName, bindonce),
            tdClass = item.cssProperty ? ' class="' + item.cssProperty + '" ' : '';
        tbodys += `<td ${tdClass}> ${tdContent}</td>`;
    });
    return `<tbody><tr  data-ng-if="!loadingState" ${bindonce} data-ng-repeat="${itemName}  in ${itemList}"> ${tbodys}</tr></tbody>`;
}


function getTruncateText(item, itemName, bindonce) {
    var truncateText = '',
        filter = item.filter,
        field = item.field,
        o = itemName + '.' + field,
        filedDirective = item.filedDirective || item.fieldDirective;
    if (filedDirective) {
        return filedDirective;
    }
    if (field) {
        if (filter) {
            o += '|' + filter;
        }
        if (item.truncateText) {
            var truncateTextLegnth = item.truncateTextLegnth || item.truncateTextLength,
                textLength = truncateTextLegnth ? ' text-length=' + truncateTextLegnth : '',
                copyText = item.copyText ? ' copy-text=' + item.copyText : '',
                tooltipPlacement = item.tooltipPlacement ? ' tooltip-placement=' + item.tooltipPlacement : '';
            truncateText = '<span aliyun-truncate-text source-text="{{' + o + '}}" ' + textLength + copyText + tooltipPlacement + '></span>';
        } else if (item.bindable == 1 || bindonce == 0) {
            truncateText = item.htmlField ? '<span ng-bind-html=' + o + ' ></span>' : '{{' + o + '}}';
        } else {
            var htmlField = item.htmlField ? 'bo-html' : 'bo-text';
            truncateText = '<span ' + htmlField + '="' + o + '"></span>';
        }
    }
    return truncateText;
}

function getTfoot(columns, options) {
    var checkBoxTfoot = '';
    if (options.checkboxSupport) {
        checkBoxTfoot = getTdOrTh(false);
    }
    var colspan = columns.length,
        showPageGotoHtml = '';
    if (options.paginationInfo && options.paginationInfo.showPageGoto) {
        showPageGotoHtml = ' show-page-goto="' + options.paginationInfo.showPageGoto + '" ';
    }
    var pullRight = '<div data-ng-if="paginationSupport && showNoneDataInfoTip != true && !loadingState"><div class="pull-right" console-pagination pagination-info="paginationInfo" ' + showPageGotoHtml + ' max-size="maxSize"' + ' on-select-page="pageChanged(page)"></div></div>',
        batchOperationBarDirective = options.batchOperationBarDirective || '',
        pullLeft = '<div class="pull-left">' + batchOperationBarDirective + '</div>',
        tfootBody = '<td colspan=" ' + colspan + '" >' + pullLeft + pullRight + '</td>',
        fixTable = '';
    if (options.tfootPositionFixed == 1) {
        fixTable = 'table-fixed ';
    }
    if (batchOperationBarDirective !== '' || options.paginationSupport) {
        return '<tfoot ' + fixTable + ' ng-if="!showNoneDataInfoTip"><tr>' + checkBoxTfoot + tfootBody + '</tr></tfoot>';
    } else {
        return '';
    }
}

function getTdOrTh(isTh) {
    var nodeType = isTh ? 'th' : 'td';
    return  `<${nodeType} width="10"><input type="checkbox" data-ng-model="tableState.selectAll" ng-change="changeSelectionAll()"/></${nodeType} >`;
}

function getSearchBar(config, ilEm) {
    if (config.searchSupport) {
        var searchBar = '<div console-search-bar search-text="searchParams.value" dimensions="searchItems" search-action="searchAction(data)" search-text="searchParams.searchCondition" ></div>';
        ilEm[0].getElementsByClassName('.searchSection').item(0).innerHTML = searchBar;
    }
}

function _filterParams(params) {
    var ajaxParams = {};
    angular.extend(ajaxParams, params.pageInfo);
    angular.extend(ajaxParams, params.filterParams);
    var searchParams = params.searchParams;
    if (searchParams) {
        var searchParam = {};
        if (searchParams.key && searchParams.value) {
            searchParam[searchParams.key] = searchParams.value;
        }
        angular.extend(ajaxParams, searchParam);
    }
    return ajaxParams;
}

export default function simpleGrid($compile, $filter) {
    return {
        restrict: 'A',
        scope: {
            columns: '=',
            store: '=',
            config: '=',
            paginationInfo: '=',
            loadingState: '=',
            renderTable: '&',
            searchPreHandler: '&',
            selectionChange: '&'
        },
        template: simpleGridTempl,
        controller: function ($scope) {
            $scope.initTableRequestSend = false;
            $scope._searchPreHandler = function (thead, isTableFilter) {
                if (angular.isFunction($scope.searchPreHandler)) {
                    $scope.searchPreHandler({
                        data: {
                            data: thead,
                            scope: $scope,
                            isTableFilter: isTableFilter
                        }
                    });
                }
            };
            $scope.changeSelectionAll = function () {
                var config = $scope.config,
                    selectedProperty = config.selectedProperty,
                    checkboxDisabledProperty = config.checkboxDisabledProperty,
                    selectAll = $scope.tableState.selectAll,
                    o = [];
                angular.forEach($scope.store, function (value, t) {
                    if (!checkboxDisabledProperty || !value[checkboxDisabledProperty]) {
                        value[selectedProperty] = selectAll;
                    }
                    if (selectAll) {
                        o.push(value);
                    }

                });
                $scope.selectionChangeHandler(o);
            };
            $scope.changeSelection = function (item) {
                var selectedProperty = $scope.config.selectedProperty;
                item[selectedProperty] = !item[selectedProperty];
                var i, s = true,
                    o = [];
                angular.forEach($scope.store, function (value, key) {
                    var storeProperty = value[selectedProperty];
                    if (key === 0) {
                        i = item;
                    }
                    if (i !== storeProperty) {
                        s = false;
                    }
                    if (storeProperty) {
                        o.push(value);
                    }
                });
                if (s == 1) {
                    $scope.tableState.selectAll = i;
                } else {
                    $scope.tableState.selectAll = false;
                }
                $scope.selectionChangeHandler(o);
            }
            $scope.selectionChangeHandler = function (items) {
                var selectedScopeProperty = $scope.config.selectedScopeProperty;
                $scope[selectedScopeProperty] = items;
                $scope.config.selectedItems = items;
                $scope.selectionChange({
                    data: items
                });
            }
            $scope.serverSortHandler = function (sortField) {
                var asc;
                angular.forEach($scope.columns, function (value) {
                    if (value && value.field && value.field == sortField) {
                        asc = value;
                    }
                });
                if (asc) {
                    asc.asc = !asc.asc;
                }
                $scope.updateList(false, {
                    sortField: sortField,
                    isAsc: asc.asc
                });
            };
            $scope.refreshCurrentView = function () {
                var selectedScopeProperty = $scope.config.selectedScopeProperty;
                $scope[selectedScopeProperty] = [];
                $scope.initSearchAndFilterCondition();
                $scope.updateList();
            };
            $scope.initSearchAndFilterCondition = function () {
                $scope.clearFilterCondition();
                $scope.searchParams = {};
            };
            $scope.clearFilterCondition = function () {
                $scope.filterItemMap = {};
                $scope.filterParams = {};
            }
        },
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.tableState = {
                selectAll: false
            }

            $scope.initSearchAndFilterCondition();

            $scope.changeTheadFilter = function (thead) {
                $scope._searchPreHandler(thead, true);
                var filterField = thead.filterField,
                    item = thead.item;
                $scope.filterItemMap[filterField] = item;
                var filterParams = $scope.filterParams || {};
                if (filterField) {
                    if (item.id == 'all') {
                        delete filterParams[filterField];
                    } else {
                        filterParams[filterField] = item.id;
                    }
                }

                $scope.filterParams = filterParams;
                $scope.paginationInfo.page = 1;
                $scope.searchParams = {};
                $scope.updateList();

            }

            $scope.pageChanged = function (pno) {
                $scope.paginationInfo.page = pno;
                $scope.selectionChangeHandler([]);
                var config = $scope.config;
                if (config.serverSort && config.sortSetting) {
                    $scope.updateList(false, config.sortSetting, 'pageChanged');
                } else {
                    $scope.updateList(undefined, undefined, 'pageChanged');
                }
            }

            $scope.searchAction = function (params) {
                $scope._searchPreHandler(params, false);
                if ($scope.config.paginationSupport && $scope.paginationInfo) {
                    $scope.paginationInfo.page = 1;
                }
                $scope.clearFilterCondition();
                $scope.searchParams = params;
                $scope.updateList(undefined, undefined, 'search');
            };
            $scope.updateList = function (isInitTable, sortSetting, type) {
                if (isInitTable) {
                    $scope.initTableRequestSend = true;
                }
                var config = $scope.config,
                    paginationInfo = $scope.paginationInfo,
                    params = {};
                if (config.paginationSupport) {
                    if (paginationInfo === undefined) {
                        paginationInfo = config.paginationInfo;
                    }
                    $scope.maxSize = config.paginationInfo.maxSize || 3;
                    params.pageInfo = {
                        pageSize: paginationInfo.pageSize,
                        currentPage: paginationInfo.page
                    };
                }
                if (config.filterItems) {
                    params.filterParams = $scope.filterParams;
                }
                if (config.searchItems) {
                    params.searchParams = $scope.searchParams;
                }
                if (sortSetting) {
                    config.sortSetting = sortSetting;
                }
                $scope.ajaxOptions = _filterParams(params);
                $scope.renderTable()({
                    data: {
                        params: _filterParams(params),
                        isInitTableRequest: isInitTable,
                        sortSetting: sortSetting,
                        actionType: type,
                        orginalParams: params
                    }
                });
            }
            $scope.updateSelectionExternal = function (e) {
                $scope.selectionChangeHandler(e)
            };
            $scope.$watchCollection('[config, columns]', function (items) {
                if (items) {
                    var config = items[0];
                    if (config.filterItems) {
                        $scope.filterItems = config.filterItems;
                    }
                    if (config.searchItems) {
                        $scope.searchItems = config.searchItems;
                    }
                    // if (config.preSelectionFilter) {
                    // 	$scope.filterParams = config.preSelectionFilter;
                    // }
                    // if (config.preSelectionSearch) {
                    // 	$scope.searchParams = config.preSelectionSearch;
                    // }
                    if (config.checkboxSupport && config.selectedProperty === undefined) {
                        $scope.selectedProperty = 'selected';
                    }

                    config.refreshCurrentView = $scope.refreshCurrentView;
                    if (!angular.isFunction(config.updateSelectionExternal)) {
                        config.updateSelectionExternal = $scope.updateSelectionExternal;
                    }

                    var columns = items[1],
                        simpleGridTemplate;
                    if (config.noneDataInfoDirective) {
                        simpleGridTemplate = '<div class="simple-grid-none-data text-center" ' + config.noneDataInfoDirective + ' ajax-options="ajaxOptions"  data-ng-if="showNoneDataInfoTip && !loadingState" ></div>';
                    } else {
                        simpleGridTemplate = '<div class="simple-grid-none-data "  none-data-info-tip  data-ng-if="showNoneDataInfoTip && !loadingState"><span class="margin-left" ng-bind="noneDataInfoMessage"></span></div>';
                    }

                    // simpleGridTemplate = angular.element(simpleGridTemplate);
                    // iElm.find('div').html(simpleGridTemplate)
                    iElm[0].getElementsByClassName('simple-grid-none-data-wrap').item(0).innerHTML = simpleGridTemplate;
                    $scope.noneDataInfoMessage = '没有查询到符合条件的记录';
                    $scope.paginationSupport = config.paginationSupport;

                    var c = getSearchBar(config, iElm),
                        tableTemplate = getTable(columns, config);
                    iElm[0].getElementsByClassName('gridSection').item(0).innerHTML = tableTemplate;
                    // iElm[0].getElementsByClassName('gridSection').innerHTML=tableTemplate;
                    // iElm.find('.gridSection').html(tableTemplate);
                    $compile(iElm.contents())($scope);

                    if ($scope.initTableRequestSend == 0) {
                        $scope.updateList(true);
                    }
                }
            });

            $scope.$watchCollection('[store, paginationInfo]', function (items) {
                if (items) {
                    var store = items[0] || [];
                    $scope.showNoneDataInfoTip = store.length == 0 ? true : false;
                    $scope.tableState.selectAll = false;

                    var paginationInfo = items[1];
                    if (store.length == 0 && paginationInfo && paginationInfo.page > 1) {
                        $scope.paginationInfo.page -= 1;
                        $scope.updateList();
                    }

                }
            })
        }
    };
}

simpleGrid.$injector = ['$compile', '$filter'];