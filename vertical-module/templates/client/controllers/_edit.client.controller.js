'use strict';

angular.module('<%= camelizedPluralName %>').controller('Edit<%= classifiedSingularName %>Controller', ['$scope', 'item', '$modalInstance',
	function($scope, item, $modalInstance) {
		$scope.<%= camelizedSingularName %> = item;

		$scope.submit = function() {
			$scope.__progress = true;
			$scope.<%= camelizedSingularName %>.$update(function() {
				$scope.__progress = false;
				$modalInstance.close();
			}, function(err) {
				$scope.__progress = false;
				$scope.error = err.data.message;
			});
		};

		$scope.cancel = function() {
			$modalInstance.dismiss();
		};
	}
]);