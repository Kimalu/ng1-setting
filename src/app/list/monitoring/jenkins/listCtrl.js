import TableConfig from '../model/common';
import monitoringCtrl from '../commonCtrl';

const API = {
    add: "http://elk.sdp:5601/app/kibana?#/discover/?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now%2Fw,mode:quick,to:now%2Fw))&_a=(columns:!('@_host','@_uri','@_status'),filters:!(),index:%5Bnginx-%5DYYYY.MM.DD,interval:auto,query:(query_string:(analyze_wildcard:!t,query:'%2B@_host:*${app_name}*%20%2B@_status:500')),sort:!('@_uri',asc))&indexPattern=%5Bnginx-%5DYYYY.MM.DD&type=histogram",
    search: "http://wuxi.zipkin.web.sdp:8080/?serviceName=${host}&spanName=all&startTs=${startTs}&endTs=${endTs}&minDuration=&limit=10&annotationQuery="
}
/**/
export default class JekinsCheckCtrl extends monitoringCtrl {
    constructor(request, appDialog, $scope) {
        super({request, appDialog, $scope, TableConfig})
        Object.assign(this, {request, appDialog, $scope});
    }
    update(data) {
        this.loading = true;
        this.request.findJenkins(data).then((res) => {
            this.rerender(res.data);
        }).catch((err) => {
            this.rerender(err.data || {});
        });
    }

    rerender(data) {
        this.loading && (this.loading = false);
        this.itemList = (data.content || []).map(item => {
            item.addConsole = API.add.format({
                app_name: item.request_host.split('.')[0].split('/')[2]
            })
            let date = new Date();
            item.searchConsole = API.search.format({
                host: item.request_host,
                startTs: new Date(date.getFullYear(), date.getMonth(), date.getDate(), '00', '00', '00').getTime(),
                endTs: date.getTime()
            });
						return item;
        });
        data.number && (this.pageInfo = helper.pageHandler(data));
    }
}

JekinsCheckCtrl.$inject = ['commonJenkinsService', 'appDialog', '$scope'];
