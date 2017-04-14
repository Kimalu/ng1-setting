//插件
import uiRouter from 'angular-ui-router';
import ipCookie from 'angular-cookie';

//common
import comservice from './common/services/_base';
import comdirective from './common/directives/_base';
import comfilters from './common/filters/_base';
//
import list from './list/_base';
//
require('bootstrap/dist/css/bootstrap.css');
angular.module('app', ['ui.bootstrap', 'ipCookie','app.common.directives', 'app.common.services', 'app.common.filters', uiRouter, list.name

])
