'use strict';
var util = require('util'),
	path = require('path'),
	yeoman = require('yeoman-generator'),
	chalk = require('chalk');


var MeanGenerator = yeoman.generators.Base.extend({
	initializing: {
		greet: function() {
			// replace it with a short and sweet description of your generator
			console.log('Welcome to the ' + chalk.blue('Properly ') + chalk.red('Mean ') + chalk.yellow('JavaScript ') + 'generator');
		},
		getPackage: function() {
			// read the local package file
			this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));
		},
	},

	install: {
		npm: function() {
			// invoke npm install on finish
			this.on('end', function() {
				if (!this.options['skip-install']) {
					this.npmInstall();
				}
			});
		}
	},

	end: {
		goodbye: function() {
			console.log('Your in good hands with the  ' + chalk.blue('Properly ') + chalk.red('Mean ') + chalk.yellow('JavaScript ') + 'generator');
			console.log('Time to start building');
		}
	},

	askForApplicationDetails: function() {
		var done = this.async();

		var prompts = [
			{
				name: 'appName',
				message: 'What would you like to call your application?',
				default: 'MEAN'
			}, 
			// {
			// 	name: 'appDescription',
			// 	message: 'How would you describe your application?',
			// 	default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
			// }, 
			// {
			// 	name: 'appKeywords',
			// 	message: 'How would you describe your application in comma separated key words?',
			// 	default: 'MongoDB, Express, AngularJS, Node.js'
			// }, 
			// {
			// 	name: 'appAuthor',
			// 	message: 'What is your company/author name?'
			// }, 
			// {
			// 	type: 'confirm',
			// 	name: 'addChatExample',
			// 	message: 'Would you like to generate the chat example module? (adds socket.io support)',
			// 	default: true
			// }
		];

		this.prompt(prompts, function(props) {
			this.appName = props.appName;
			// this.appDescription = props.appDescription;
			// this.appKeywords = props.appKeywords;
			// this.appAuthor = props.appAuthor;
			// this.addChatExample = props.addChatExample;
			this.addChatExample = false;
			this.appDescription = '';
			this.appKeywords = '';
			this.appAuthor = '';

			this.slugifiedAppName = this._.slugify(this.appName);
			this.humanizedAppName = this._.humanize(this.appName);
			this.capitalizedAppAuthor = this._.capitalize(this.appAuthor);

			done();
		}.bind(this));
	},

	askForAngularApplicationModules: function() {
		var done = this.async();

		var prompts = [
			// {
			// 	type: 'checkbox',
			// 	name: 'modules',
			// 	message: 'Which modules would you like to include?',
			// 	choices: [
			// 		{
			// 			value: 'angularCookies',
			// 			name: 'ngCookies',
			// 			checked: true
			// 		},
			// 		{
			// 			value: 'angularAnimate',
			// 			name: 'ngAnimate',
			// 			checked: true
			// 		}, 
			// 		{
			// 			value: 'angularTouch',
			// 			name: 'ngTouch',
			// 			checked: true
			// 		}, 
			// 		{
			// 			value: 'angularSanitize',
			// 			name: 'ngSanitize',
			// 			checked: true
			// 		}, 
			// 		{
			// 			value: 'socket.io',
			// 			name: 'socketio',
			// 			checked: true
			// 		}
			// 	]
			// }
		];

		this.prompt(prompts, function(props) {
			// this.angularCookies = this._.contains(props.modules, 'angularCookies');
			// this.angularAnimate = this._.contains(props.modules, 'angularAnimate');
			// this.angularTouch = this._.contains(props.modules, 'angularTouch');
			// this.angularSanitize = this._.contains(props.modules, 'angularSanitize');
			// this.socketio = this.renderChatExample || this._.contains(props.modules, 'socketio');
			this.angularCookies = true;
			this.angularAnimate = false;
			this.angularTouch = false;
			this.angularSanitize = true;
			this.socketio = false;

			done();
		}.bind(this));
	},

	copyApplicationFolder: function() {
		// Vertical Modules
		this.mkdir('modules');
        
        // Copy core module
        this.mkdir('modules/core');
        this.directory('modules/core/server');
        this.mkdir(    'modules/core/client');
        this.copy(     'modules/core/client/core.client.module.js');
        this.mkdir(    'modules/core/client/app');
        this.template( 'modules/core/client/app/_config.js', 'modules/core/client/app/config.js');
        this.copy(     'modules/core/client/app/init.js');
        this.directory('modules/core/client/config');
        this.directory('modules/core/client/controllers');
        this.directory('modules/core/client/css');
        this.directory('modules/core/client/img');
        this.directory('modules/core/client/services');
        this.directory('modules/core/client/views');
        this.directory('modules/core/tests');
        
        // Copy user module
        this.directory('modules/users');
        
        // Copy config folder
        this.mkdir('config');
        this.directory('config/lib');
        this.directory('config/assets');
        this.copy('config/config.js');
        
		// Copy project files
		this.copy('root-assets/karma.conf.js', 'karma.conf.js');
		this.copy('root-assets/gruntfile.js', 'gruntfile.js');
		this.copy('root-assets/server.js', 'server.js');
		this.copy('root-assets/Dockerfile', 'Dockerfile');
        
		// Copy project hidden files
		this.copy('root-assets/bowerrc', '.bowerrc');
		this.copy('root-assets/csslintrc', '.csslintrc');
		this.copy('root-assets/editorconfig', '.editorconfig');
		this.copy('root-assets/jshintrc', '.jshintrc');
		this.copy('root-assets/gitignore', '.gitignore');
        
        // Create the public dir
        this.mkdir('public');
        this.mkdir('public/dist');
        this.copy('public/humans.txt');
        this.copy('public/robots.txt');
	},
    
    renderChatExample: function() {
        // if (this.addChatExample) {
        //     this.directory('modules/chat');
        // }
    },

	renderApplicationEnvironmentConfigFiles: function() {
		this.template('config/env/_default.js', 'config/env/default.js');
		this.template('config/env/_development.js', 'config/env/development.js');
		this.template('config/env/_production.js', 'config/env/production.js');
		this.template('config/env/_test.js', 'config/env/test.js');
		this.template('config/env/_secure.js', 'config/env/secure.js');
	},

    renderCoreModuleFiles: function() {
		this.template('modules/core/client/views/_header.client.view.html',   
                      'modules/core/client/views/header.client.view.html');
	},

	renderApplicationDependenciesFiles: function() {
		this.template('root-assets/_package.json', 'package.json');
		this.template('root-assets/_bower.json', 'bower.json');
	}
});

module.exports = MeanGenerator;
