'use strict';

var inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var TestGenerator = yeoman.generators.NamedBase.extend({
	renderTestFile: function() {
		// Set model names
		this.slugifiedModelName = this._.slugify(this._.humanize(this.name));
		this.classifiedModelName = this._.classify(this.slugifiedModelName);
		this.humanizedModelName = this._.humanize(this.slugifiedModelName);
		this.camelizedModelName = this._.camelize(this.slugifiedModelName);

		this.slugifiedPluralModelName = inflections.pluralize(this.slugifiedModelName);
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedModelName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModule: function() {
		var done = this.async();
		
		var prompts = [{
			type: 'list',
			name: 'moduleChoice',
			message: 'Which module would you like to add this model test to?',
			choices: this.availableModuleChoices
		}];
		
		this.prompt(prompts, function(props) {
			this.moduleChoice = props.moduleChoice || this.slugifiedModelName;
			done();
		}.bind(this));
	},
	renderTemplates: function() {
		// We create the test file for the models
		this.template('_.server.model.test.js', 
					  'modules/' + this.moduleChoice + '/server/tests/' + this.slugifiedModelName + '.server.model.test.js');
	}
});

module.exports = TestGenerator;