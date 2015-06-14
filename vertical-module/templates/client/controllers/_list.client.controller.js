'use strict';

// <%= humanizedPluralName %> controller
angular.module('<%= slugifiedPluralName %>').controller('List<%= classifiedPluralName %>Controller', ['$scope', '<%= classifiedPluralName %>', 'ContextMenuService', 'ListHelpers',
	function($scope, <%= classifiedPluralName %>, ContextMenuService, ListHelpers) {

		$scope.<%= camelizedPluralName %> = <%= classifiedPluralName %>.query();

		$scope.<%= camelizedPluralName %>.$promise.then(function() {
			$scope.tableParams.reload();
		});

		$scope.openEditModal = ListHelpers.editModal('<%= camelizedSingularName %>', '<%= camelizedPluralName %>');
		$scope.openAddModal = ListHelpers.addModal('<%= camelizedSingularName %>', '<%= camelizedPluralName %>', function(result) {
            $scope.<%= camelizedPluralName %>.push(result);
            $scope.tableParams.reload();
            // TopAlert.alert('Success:', '<%= humanizedSingularName %> has been added.');
        });
		$scope.tableParams = ListHelpers.tableParams($scope.<%= camelizedPluralName %>);
		
		$scope.contextMenuDeleteConfirm = function() {
			$scope.contextMenuDeleteable = angular.element(ContextMenuService.element).scope().<%= camelizedSingularName %>;

			$scope.deleteOverlay(ContextMenuService.element);
		};

		$scope.deleteOverlay = function(target) {
			$scope.deleteConfirmationOverlay = true;
			var rowPosition = angular.element(target).parents('tr')[0].getBoundingClientRect();
			var offset = (angular.element(target).parents('tr').offset());
			var overlay = angular.element('.table-row-overlay').first();
			overlay.css({
				top: offset.top,
				left: rowPosition.left,
				width: rowPosition.width,
				height: rowPosition.height,
			})
			.show();
		};

		$scope.contextMenuDelete = function() {
			var <%= camelizedSingularName %> = $scope.contextMenuDeleteable;

			$scope.__deleteProgress = true;

			<%= camelizedSingularName %>.$remove(function() {
				$scope.__deleteProgress = false;
				for (var i in $scope.<%= camelizedPluralName %>) {
					if ($scope.<%= camelizedPluralName %>[i]._id === <%= camelizedSingularName %>._id) {
						$scope.<%= camelizedPluralName %>.splice(i, 1);
						$scope.tableParams.reload();
					}
				}
				$scope.deleteConfirmationOverlay = false;
			});
		};
	}
]);