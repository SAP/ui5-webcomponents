#!/usr/bin/env node

const child_process = require("child_process");

let command = process.argv[2];

// Support for running the test task with a spec parameter
if (command === "test") {
	const spec = process.argv[3];
	if (spec) {
		command = `test.spec --spec ${spec}`;
	}
}

child_process.execSync(`npx nps "${command}"`, {stdio: 'inherit'});
