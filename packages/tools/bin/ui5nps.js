#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("Executing ui5nps...");

const SCRIPT_NAMES = [
	"package-scripts.js",
	"package-scripts.cjs",
	"package-scripts.mjs"
]

const getScripts = () => {
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

	return scripts;
}

const displayScripts = (scriptObj, prefix = "") => {
	Object.entries(scriptObj).forEach(([key, value]) => {
		const fullKey = prefix ? `${prefix}.${key}` : key;

		if (typeof value === "string") {
			console.log(`- ${fullKey}: ${value}`);
		} else if (typeof value === "object") {
			displayScripts(value, fullKey);
		}
	});
};


const scripts = getScripts();

// When script is not passed, show available scripts
if (process.argv.length <= 2) {
	console.log("Available scripts:");
	displayScripts(scripts);
	process.exit(0);
}

const resolveScriptValue = (scriptValue) => {
	if (typeof scriptValue === "string") {
		return scriptValue;
	} else if (typeof scriptValue === "object") {
		return scriptValue.default;
	}

	return null;
};

const getScript = (scriptName) => {
	if (scripts[scriptName]) {
		return scripts[scriptName];
	}

	if (scriptName.includes(".")) {
		let currentScript = scripts;
		const subParts = scriptName.split(".");
		for (const subPart of subParts) {
			if (currentScript[subPart]) {
				currentScript = currentScript[subPart];
			} else {
				return null;
			}
		}
		return currentScript;
	}

	return null;
};

// Handle cases like: ui5nps \"start -w\"
function splitArgs(str) {
	return str.match(/(?:[^\s"]+|"[^"]*")+/g).map(s => s.replace(/"/g, ""));
}

const flattenExcScripts = (script, excScripts = [], parallel = false) => {
	script = script.trim();
	let crossEnvPrefix = "";

	if (script.startsWith("cross-env")) {
		if (!script.includes("ui5nps")) {
			return [{ commands: [script], parallel }];
		}

		const match = script.match(/(cross-env.+?)ui5nps/);

		if (match) {
			crossEnvPrefix = match[1];
			script = script.replace(crossEnvPrefix, "");
		}
	} else if (!script.startsWith("ui5nps")) {
		return [{ commands: [script], parallel }];
	}

	parallel = script.includes("--parallel") || parallel;
	script = script.replace("--parallel", "").trim();

	const parts = splitArgs(script).slice(1); // Remove the initial "ui5nps"
	let buildExcScripts = [];

	for (let part of parts) {
		let restArgs = "";
		if (part.includes(" ")) {
			restArgs = part.split(" ").slice(1).join(" ");
			part = part.split(" ")[0]
		}

		const foundScript = getScript(part);

		if (foundScript) {
			const resolvedScript = resolveScriptValue(foundScript);
			if (resolvedScript) {
				let flattened = flattenExcScripts(resolvedScript, undefined, parallel);

				// Append restArgs to each command in flattened
				flattened = flattened.map(s => {
					return { commands: s.commands.map(cmd => `${cmd} ${restArgs}`.trim()), parallel: s.parallel };
				});

				buildExcScripts.push(...flattened);
			}
		} else {
			console.error(`Script not found: ${part}`);
		}
	}

	if (parallel) {
		buildExcScripts = [{ commands: buildExcScripts.map(s => s.commands).flat(), parallel }];
	}

	buildExcScripts = buildExcScripts.map(s => {
		// Append cross-env prefix if exists
		return { commands: s.commands.map(cmd => `${crossEnvPrefix} ${cmd}`.trim()), parallel: s.parallel };
	});

	return [...excScripts, ...buildExcScripts];
};

const execution = process.argv.slice(2).reduce((excScripts, script) => {
	const foundScript = getScript(script);

	if (foundScript) {
		const resolvedScript = resolveScriptValue(foundScript);
		if (resolvedScript) {
			excScripts.push(...flattenExcScripts(resolvedScript));
		}
	} else {
		console.error(`Script not found: ${script}`);
	}

	return excScripts;
}, []);

execution.forEach((cmd) => {
	cmd.commands.forEach((command) => {
		console.log(`Executing command: ${command}`);
		execSync(command, { stdio: "inherit" });
	});
});

console.log("Execution finished.");