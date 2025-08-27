const { execSync } = require('child_process');

function buildCrossEnvCommand(task) {
	if (!task.crossEnv || Object.keys(task.crossEnv).length === 0) {
		return task.command;
	}

	const envVars = Object.entries(task.crossEnv)
		.map(([key, value]) => `${key}=${value}`)
		.join(' ');

	return `cross-env ${envVars} ${task.command}`;
}

class BuildRunner {
	static BUILD_RUNNER_CONSTANTS = {
		PRINT: "PRINT25",
	};

	constructor() {
		this.tasks = new Map();
		this.runningTasks = new Set();
	}

	// Register a task
	addTask(name, command, options = {}) {
		this.tasks.set(name, {
			command: command === BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT ? `echo "${name} command started"` : command,
			cwd: process.cwd(),
			crossEnv: { ...options.crossEnv },
			env: { ...process.env, ...options.env },
			parallel: options.parallel || false,
			skip: options.skip || false,
			dependencies: options.dependencies || []
		});
	}

	// Register a task
	emptyTask(taskName) {
		let task = this.tasks.get(taskName);

		if (task) {
			task.command = "";

			this.tasks.set(taskName, task)
		}
	}

	// Run a single task
	async runTask(taskName, parentEnv = {}, parentCrossEnv = {}) {
		if (this.runningTasks.has(taskName)) {
			return; // Already running
		}

		let task = this.tasks.get(taskName);

		if (!task) {
			// Only execute if it's not a registered command - create a default task
			this.addTask(taskName, taskName);
			task = this.tasks.get(taskName);
		}

		if (!task.command || task.skip) {
			return;
		}

		// Merge parent environment variables with task environment
		const mergedEnv = { ...task.env, ...parentEnv };
		const mergedCrossEnv = { ...task.crossEnv, ...parentCrossEnv };
		task = { ...task, env: mergedEnv, crossEnv: mergedCrossEnv };

		if (task.parallel) {
			const promises = [];

			// Run dependencies first, passing along the merged environment
			for (const dep of task.dependencies) {
				promises.push(this.runTask(dep, mergedEnv, mergedCrossEnv));
			}

			await Promise.all(promises);
		} else {
			// Run dependencies first, passing along the merged environment
			for (const dep of task.dependencies) {
				await this.runTask(dep, mergedEnv, mergedCrossEnv);
			}
		}

		this.runningTasks.add(taskName);

		try {
			console.log(`Running: ${taskName}`);

			return new Promise((resolve, reject) => {
				try {
					const result = execSync(buildCrossEnvCommand(task), {
						cwd: task.cwd,
						env: task.env,
						stdio: 'inherit'
					});
					resolve(result);
				} catch (error) {
					reject(error);
				}
			});
		} finally {
			this.runningTasks.delete(taskName);
		}
	}

	// Run multiple tasks
	async run(...taskNames) {
		for (const taskName of taskNames) {
			await this.runTask(taskName);
		}
	}
}

module.exports = BuildRunner;