const chromedriver = require("chromedriver");

// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/

module.exports = {
	// An array of folders (excluding subfolders) where your tests are located;
	// if this is not specified, the test source must be passed as the second argument to the test runner.
	src_folders: ["tests"],

	// See https://nightwatchjs.org/guide/concepts/page-object-model.html
	// page_objects_path: ["pages"],

	// See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
	// custom_commands_path: ["commands"],

	// See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
	custom_assertions_path: ['assertions'],

	webdriver: {},

	test_workers: {
		enabled: true,
	},

	test_settings: {
		default: {
			desiredCapabilities: {
				browserName: "chrome",
				"goog:chromeOptions": {
					w3c: true,
					args: [
						// '--headless'
					],
				},
			},

			webdriver: {
				start_process: true,
				server_path: chromedriver.path,
			},
		},
	},
};
