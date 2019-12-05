#!/usr/bin/env node

const child_process = require("child_process");

child_process.execSync(`npx nps ${process.argv[2]}`, {stdio: 'inherit'});
