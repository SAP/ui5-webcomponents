#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

const SCRIPT_NAMES = [
	"package-scripts.js",
	"package-scripts.cjs",
	"package-scripts.mjs"
]

/**
 * Parser for UI5 package scripts with support for parallel and sequential execution
 */
class Parser {
	scripts;
	envs;
	parsedScripts = new Map();
	resolvedScripts = new Map();

	constructor() {
		const { scripts, envs } = this.getScripts();

		this.scripts = scripts;
		this.envs = envs;
		this.parseScripts();
	}

	/**
	 * Recursively parses script definitions from package-scripts file
	 * @param {Object} scripts - Script definitions object
	 * @param {string} parentKey - Parent key for nested scripts
	 */
	parseScripts(scripts = this.scripts, parentKey = "") {
		for (const [key, value] of Object.entries(scripts)) {
			if (key === "__ui5envs") continue; // Skip envs key

			if (parentKey && key === "default") {
				this.parsedScripts.set(parentKey, value);
			}

			const fullKey = parentKey ? `${parentKey}.${key}` : key;

			if (typeof value === "string") {
				this.parsedScripts.set(fullKey, value);
			} else if (typeof value === "object") {
				this.parseScripts(value, fullKey);
			} else {
				throw new Error(`Invalid script definition for key: ${fullKey}`);
			}
		}
	}

	/**
	 * Resolves script commands and determines if they should run in parallel
	 * @param {string} commandName - Name of the command to resolve
	 * @returns {Object} Resolved command object with commands array and parallel flag
	 */
	resolveScripts(commandName) {
		if (this.resolvedScripts.has(commandName)) {
			return this.resolvedScripts.get(commandName);
		}

		let executableCommand = this.parsedScripts.get(commandName);
		if (!executableCommand) {
			throw new Error(`Command "${commandName}" not found in scripts`);
		}

		if (!executableCommand.startsWith("ui5nps") && !executableCommand.startsWith("ui5nps-p")) {
			this.resolvedScripts.set(commandName, { commandName, commands: [executableCommand], parallel: false });
			return this.resolvedScripts.get(commandName);
		}

		const parts = executableCommand.trim().split(" ").filter(Boolean).slice(1); // Remove "ui5nps" or ui5nps-p part
		const commands = [];
		for (const part of parts) {
			const parsedScript = this.parsedScripts.get(part);

			if (parsedScript && (parsedScript.startsWith("ui5nps") || parsedScript.startsWith("ui5nps-p"))) {
				this.resolveScripts(part);
			}

			commands.push(this.resolvedScripts.get(part) || parsedScript);
		}


		this.resolvedScripts.set(commandName, { commandName, commands, parallel: executableCommand.startsWith("ui5nps-p") });

		return this.resolvedScripts.get(commandName);
	}

	/**
	 * Loads and validates package-scripts file
	 * @returns {Object} Object containing scripts and environment variables
	 */
	getScripts() {
		let packageScriptPath;

		for (const scriptName of SCRIPT_NAMES) {
			const filePath = path.join(process.cwd(), scriptName);
			if (fs.existsSync(filePath)) {
				packageScriptPath = filePath;
				break;
			}
		}

		// Package-script file should be in the current working directory
		if (!packageScriptPath) {
			console.error("No package-scripts.js/cjs/mjs file found in the current directory.");
			process.exit(1);
		}

		const packageScript = require(packageScriptPath);
		let scripts;
		let envs;

		if (packageScript.__esModule) {
			scripts = packageScript.default.scripts;
		} else {
			scripts = packageScript.scripts;
		}

		// Package-script should provide default export with scripts object
		if (!scripts || typeof scripts !== "object") {
			console.error("No valid 'scripts' object found in package-scripts file.");
			process.exit(1);
		}

		envs = scripts.__ui5envs;

		// Package-script should provide default export with scripts object
		if (envs && typeof envs !== "object") {
			console.error("No valid 'envs' object found in package-scripts file.");
			process.exit(1);
		}

		return { scripts, envs };
	}

	/**
	 * Executes a command or command object (with parallel/sequential support)
	 * @param {string|Object} command - Command string or command object with commands array
	 * @returns {Promise} Promise that resolves when command(s) complete
	 */
	async executeCommand(command) {
		if (typeof command === "string" && command) {
			console.log("	= Executing command:");
			console.log("	", command);
			return execAsync(command, { stdio: "inherit", env: { ...process.env, ...this.envs } });
		} else if (typeof command === "object" && command.commands) {
			if (command.parallel) {
				// Execute commands in parallel
				const promises = command.commands.map(cmd => this.executeCommand(cmd));
				await Promise.all(promises);
			} else {
				// Execute commands sequentially
				for (const cmd of command.commands) {
					await this.executeCommand(cmd);
				}
			}
		}
	}

	/**
	 * Main execution method for a named command
	 * @param {string} commandName - Name of the command to execute
	 * @returns {Promise} Promise that resolves when execution completes
	 */
	async execute(commandName) {
		this.resolveScripts(commandName);

		return this.executeCommand(this.resolvedScripts.get(commandName));
	}
}

const parser = new Parser();

// Basic input validation
const commands = process.argv.slice(2);
if (commands.length === 0) {
	console.error("Usage: ui5nps <command> [command2] [command3] ...");
	console.error("No commands provided.");
	process.exit(1);
}

(async () => {
	for (const commandName of commands) {
		await parser.execute(commandName);
	}
})().catch(error => {
	console.error("Error executing commands:", error);
	process.exit(1);
});