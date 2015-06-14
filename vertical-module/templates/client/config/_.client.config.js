'use strict';

// Configuring the <%= humanizedPluralName %> module
angular.module('<%= slugifiedPluralName %>').run(['Menus',
	function(Menus) {
		// Add the <%= humanizedPluralName %> dropdown item
		Menus.addMenuItem('<%= menuId %>', {
			title: '<%= humanizedPluralName %>',
			state: '<%= slugifiedPluralName %>.list',
		});
	}
]);