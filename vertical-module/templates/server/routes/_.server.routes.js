'use strict';

module.exports = function(app) {
	var <%= camelizedPluralName %> = require('../controllers/<%= slugifiedPluralName %>.server.controller');
	var <%= camelizedPluralName %>Policy = require('../policies/<%= slugifiedPluralName %>.server.policy');

	// <%= humanizedPluralName %> Routes
	app.route('/api/<%= slugifiedPluralName %>')
		.get(<%= camelizedPluralName %>.list)
		.post(<%= camelizedPluralName %>.create);

	app.route('/api/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id')
		.get(<%= camelizedPluralName %>.read)
		.put(<%= camelizedPluralName %>.update)
		.delete(<%= camelizedPluralName %>.delete);

	// Finish by binding the <%= humanizedSingularName %> middleware
	app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);
};