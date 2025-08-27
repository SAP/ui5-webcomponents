const getScripts = require("@ui5/webcomponents-tools/components-package/custom-runner-commands.js");

const options = {
	port: 8080,
	portStep: 2,
	noWatchTS: true,
	dev: true,
	internal: {
		cypress_code_coverage: false,
		cypress_acc_tests: false,
	},
};

const scripts = getScripts(options);

// Export for CLI usage
if (require.main === module) {
	const taskName = process.argv[2];
	if (!taskName) {
		console.log('Available tasks:', Array.from(scripts.tasks.keys()).join(', '));
		process.exit(1);
	}

	scripts.run(taskName).catch(error => {
		console.error('Task failed:', error.message);
		process.exit(1);
	});
}