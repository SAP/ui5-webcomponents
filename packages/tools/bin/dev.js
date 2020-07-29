#!/usr/bin/env node

const child_process = require("child_process");

let command = process.argv[2];
const argument = process.argv[3];

if (command === "watch") {
	if (["src", "test", "bundles", "styles", "templates", "samples"].includes(argument)) {
		command = `watch.${argument}`;
	}
} else if (command === "test") {
	if (argument === "--no-server") { // yarn test --no-server
		command = `test.run`;
	} else if (argument) { // yarn test test/specs/Button.spec.js
		command = `test.spec --spec ${argument}`;
	}
}

child_process.execSync(`npx nps "${command}"`, {stdio: 'inherit'});
