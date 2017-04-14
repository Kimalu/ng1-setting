import TIP from '../common/config/tips';
import utils from '../common/helpers/utils';
import TableConfig from './model/config';
import helper from './helper';

/**/
class listCtrl {
    constructor(listService, appDialog, $scope, ipCookie) {
        Object.assign(this, {
            listService, appDialog, $scope, ipCookie
        });
        this.initDef();
        utils.init(appDialog);
        this.$scope.$on('confList:reload', (evt, data) => {
            this.pageInfo.page = 1;
            data == 'add' && (this.formData = helper.setKey(this.formData, true, ''));
            this.updateRequestParams({});
            return evt.preventDefault()
        });
        let me = this;
        this.onSubmit = function (data) {
            me.updateRequestParams(data);
        }
    }

    initDef() {
        // this.isDisabled = false;
        let readonly = this.getQueryString('readonly');
        this.isDisabled = readonly == 'false' ? true : false;
        if (readonly != 'false' && TableConfig.columns.length > 8) {
            TableConfig.columns.pop();
        }
        angular.extend(this, TableConfig)
        this.pageInfo = TableConfig.config.paginationInfo;
        this.formData = {
            group: '',
            artifact: '',
            list_type: '',
            type: ''
        };
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

    updateRequestParams(params = {}) {
        angular.extend(params, this.formData);
        params = helper.setKey(params, false, '')
        params.current_page = params.currentPage || this.pageInfo.page;
        params.page_size = params.pageSize || this.pageInfo.pageSize;
        delete params.currentPage;
        delete params.pageSize;
        this.update(params);
    }

    update(data) {
        this.loading = true;
        this.listService.update(data)
            .then((res) => {
                this.rerender(res.data);
            })
            .catch((err) => {
                this.formData = helper.setKey(this.formData, true, '');
                // utils.showAlert(err.data);
                this.rerender(err.data || {});
            });
    }

    rerender(data) {
        this.loading && (this.loading = false);
        this.itemList = data.content || [];
        data.number && (this.pageInfo = helper.pageHandler(data));
    }

    updateModel(model) {
        let me = this;
        return function (model) {
            me.updateRequestParams(model.data.params);
        }
    }


}

listCtrl.$injector = ['listService', 'appDialog', '$scope', 'ipCookie'];
export default listCtrl;
