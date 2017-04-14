export default function noneDataInfoTipDirective() {
	return {
		restrict: 'A',
		scope: true,
		replace: true,
		transclude: true,
		template: '<div class="row-padding row-margin text-center"><span class="text-size-16 text-success icon-info-1" style="vertical-align: middle"></span><div class="text-size-16 tip-text inline-block" data-ng-transclude></div></div>'
	}
}