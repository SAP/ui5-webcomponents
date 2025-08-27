const { execSync } = require('child_process');

const times = new Map();

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
	constructor() {
		this.tasks = new Map();
		this.runningTasks = new Set();
	}

	// Register a task
	addTask(name, options = {}) {
		const hasFunction = typeof options.callback === 'function';

		this.tasks.set(name, {
			callback: options.callback,
			isFunction: hasFunction,
			cwd: options.cwd || process.cwd(),
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
			task.callback = null;
			task.isFunction = false;
			task.dependencies = [];

			this.tasks.set(taskName, task)
		}
	}

	// Helper method to run either a registered task or a direct command
	async runTaskOrCommand(nameOrCommand, parentEnv = {}, parentCrossEnv = {}) {
		// Skip empty strings or null/undefined commands
		if (!nameOrCommand || nameOrCommand.trim() === '') {
			console.log('Skipping empty command');
			return Promise.resolve();
		}

		// Check if it's a registered task
		if (this.tasks.has(nameOrCommand)) {
			return this.runTask(nameOrCommand, parentEnv, parentCrossEnv);
		} else {
			// Execute as direct shell command
			console.log(`Running command: ${nameOrCommand}`);
			return new Promise((resolve, reject) => {
				const start = Date.now()
				try {
					// Create a temporary task object for buildCrossEnvCommand
					const tempTask = {
						command: nameOrCommand,
						crossEnv: parentCrossEnv
					};

					const commandToExecute = buildCrossEnvCommand(tempTask);

					const result = execSync(commandToExecute, {
						cwd: process.cwd(),
						env: { ...process.env, ...parentEnv },
						stdio: 'inherit'
					});
					resolve(result);
				} catch (error) {
					reject(error);
				} finally {
					const end = Date.now();
					if (end - start > 150) {
						times.set(nameOrCommand, `Execution time: ${(end - start) / 1000} seconds`);
					}

					if (times.size > 0) {
						console.log(`======= Completed command: ${nameOrCommand}`);
						console.log(times);
					}
				}
			});
		}
	}

	// Run a single task
	async runTask(taskName, parentEnv = {}, parentCrossEnv = {}) {
		if (this.runningTasks.has(taskName)) {
			return; // Already running
		}

		let task = this.tasks.get(taskName);

		if (!task) {
			// Only execute if it's not a registered command - create a default task for direct command execution
			this.addTask(taskName, { dependencies: [taskName] });
			task = this.tasks.get(taskName);
		}

		if ((!task.callback && !task.isFunction && (!task.dependencies || task.dependencies.length === 0)) || task.skip) {
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
				if (dep && dep.trim() !== '') {  // Skip empty dependencies
					promises.push(this.runTaskOrCommand(dep, mergedEnv, mergedCrossEnv));
				}
			}

			await Promise.all(promises);
		} else {
			// Run dependencies first, passing along the merged environment
			for (const dep of task.dependencies) {
				if (dep && dep.trim() !== '') {  // Skip empty dependencies
					await this.runTaskOrCommand(dep, mergedEnv, mergedCrossEnv);
				}
			}
		}

		this.runningTasks.add(taskName);

		try {
			console.log(`Running: ${taskName}`);

			if (task.isFunction) {
				// Execute function directly
				return new Promise(async (resolve, reject) => {
					const start = Date.now()

					try {
						const result = await task.callback();
						resolve(result);
					} catch (error) {
						reject(error);
					} finally {
						const end = Date.now();
						if (end - start > 150) {
							times.set(taskName + start, `Execution time: ${(end - start) / 1000} seconds`);
						}

						if (times.size > 0) {
							console.log(`======= Completed command: ${taskName}`);
							console.log(times);
						}
					}
				});
			} else {
				// If no function, the task is completed by running its dependencies
				return Promise.resolve();
			}
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