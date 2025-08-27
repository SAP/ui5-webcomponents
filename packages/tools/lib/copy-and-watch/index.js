/*
MIT License

Copyright (c) 2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const glob = require('glob');
const globParent = require('glob-parent');

/* CODE */

const findTarget = (from, parents, target) => {
	const parent = parents
		.filter(p => from.indexOf(p) >= 0)
		.sort()
		.reverse()[0];
	return path.join(target, path.relative(parent, from));
};

const createDirIfNotExist = to => {
	'use strict';

	const dirs = [];
	let dir = path.dirname(to);

	while (dir !== path.dirname(dir)) {
		dirs.unshift(dir);
		dir = path.dirname(dir);
	}

	dirs.forEach(dir => {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
	});
};

const copy = (from, parents, target, silent = false) => {
	const to = findTarget(from, parents, target);
	createDirIfNotExist(to);
	const stats = fs.statSync(from);
	if (stats.isDirectory()) {
		return;
	}
	fs.writeFileSync(to, fs.readFileSync(from));
	silent || console.log('[COPY]'.yellow, from, 'to'.yellow, to);
};

const remove = (from, parents, target, silent = false) => {
	const to = findTarget(from, parents, target);
	if (fs.existsSync(to)) {
		fs.unlinkSync(to);
		silent || console.log('[DELETE]'.yellow, to);
	}
};

const rimraf = dir => {
	if (fs.existsSync(dir)) {
		fs.readdirSync(dir).forEach(entry => {
			const entryPath = path.join(dir, entry);
			if (fs.lstatSync(entryPath).isDirectory()) {
				rimraf(entryPath);
			} else {
				fs.unlinkSync(entryPath);
			}
		});
		fs.rmdirSync(dir);
	}
};

const copyAndWatch = (sources, target, options = {}) => {
	const {
		watch = false,
		clean = false,
		skipInitialCopy = false,
		safe = false,
		silent = false
	} = options;

	if (!sources || !target) {
		throw new Error('Sources and target are required');
	}

	const sourceArray = Array.isArray(sources) ? sources : [sources];
	const parents = [...new Set(sourceArray.map(globParent))];

	// clean
	if (clean) {
		rimraf(target);
	}

	// initial copy
	if (!skipInitialCopy) {
		sourceArray.forEach(s => glob.sync(s).forEach(file => copy(file, parents, target, silent)));
	}

	// watch
	if (watch) {
		const chokidarOptions = {
			ignoreInitial: true
		};

		if (safe) {
			chokidarOptions.awaitWriteFinish = {
				stabilityThreshold: 500,
				pollInterval: 100
			};
		}

		const watcher = chokidar
			.watch(sourceArray, chokidarOptions)
			.on('ready', () => sourceArray.forEach(s => {
				silent || console.log('[WATCH]'.yellow, s);
			}))
			.on('add', file => copy(file, parents, target, silent))
			.on('addDir', file => copy(file, parents, target, silent))
			.on('change', file => copy(file, parents, target, silent))
			.on('unlink', file => remove(file, parents, target, silent))
			.on('unlinkDir', file => remove(file, parents, target, silent))
			.on('error', e => console.log('[ERROR]'.red, e));

		return watcher;
	}

	return null;
};

// If this file is run directly (not required as a module)
if (require.main === module) {
	const args = process.argv.slice(2);
	const options = {};

	['watch', 'clean', 'skip-initial-copy', 'safe', 'silent'].forEach(key => {
		const index = args.indexOf(`--${key}`);
		if (index >= 0) {
			options[key] = true;
			args.splice(index, 1);
		}
	});

	if (args.length < 2) {
		console.error('Not enough arguments: copy-and-watch [options] <sources> <target>'.red);
		process.exit(1);
	}

	if (options['skip-initial-copy'] && !options['watch']) {
		console.error('--skip-initial-copy argument is meant to be used with --watch, otherwise no files will be copied'.red);
		process.exit(1);
	}

	const target = args.pop();
	const sources = args;

	const cliOptions = {
		watch: options.watch,
		clean: options.clean,
		skipInitialCopy: options['skip-initial-copy'],
		safe: options.safe,
		silent: options.silent
	};

	try {
		const watcher = copyAndWatch(sources, target, cliOptions);
		if (watcher) {
			// Keep the process alive when watching
			process.on('SIGINT', () => {
				console.log('\nStopping watcher...');
				watcher.close();
				process.exit(0);
			});
		}
	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);
	}
}

module.exports = copyAndWatch;
module.exports.copyAndWatch = copyAndWatch;
module.exports.rimraf = rimraf;
module.exports.copy = copy;
module.exports.remove = remove;
module.exports.createDirIfNotExist = createDirIfNotExist;
module.exports.findTarget = findTarget;
