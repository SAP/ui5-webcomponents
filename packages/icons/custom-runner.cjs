const getScripts = require("@ui5/webcomponents-tools/icons-collection/custom-runner-commands.js");

const options = {
	collectionName: "SAP-icons",
	versions: ["v4", "v5"],
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