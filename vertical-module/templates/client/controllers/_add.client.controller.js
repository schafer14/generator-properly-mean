'use strict';

// <%= humanizedPluralName %> controller
angular.module('<%= camelizedPluralName %>').controller('Add<%= classifiedSingularName %>Controller', ['$scope', '<%= classifiedPluralName %>', '$modalInstance',
	function($scope, <%= classifiedPluralName %>, $modalInstance) {
		$scope.<%= camelizedSingularName %> = {};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		$scope.submit = function() {
			var <%= camelizedSingularName %> = new <%= classifiedPluralName %>($scope.<%= camelizedSingularName %>);
			$scope.__progress = true;

			// Redirect after save
			<%= camelizedSingularName %>.$save(function(response) {
				$scope.__progress = false;
				$modalInstance.close(response);
			}, function(errorResponse) {
				$scope.__progress = false;
				$scope.error = errorResponse.data.message;
			});

		};
		
	}
]);