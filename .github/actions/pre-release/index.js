const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const child_process = require("child_process");
const glob = require("glob-promise");
const gitRev = child_process.execSync("git rev-parse HEAD").toString();
const execSync = child_process.execSync;

const PACKAGES = {};
const NPM_ORG = "@ui5/webcomponents";

const run = async () => {
	const FILES = await glob("**/packages/**/package.json", { 
		"ignore": ["**/node_modules/**/*.*", "**/dist/**/package.json", "**/playground/**/package.json"]
	});
	
	// Step 1: process package.json files
	const pkgs = await Promise.all(FILES.map(processPackageJSON));
	console.log(FILES)
	console.log(pkgs)

	// Step 2: update package.json files and publish each package to npm
	await Promise.all(pkgs.map(async pkg => {
			await updatePackageJSON(pkg);
			publishPackage(pkg);
	}));
};

const processPackageJSON = async file => {
	const folder = file.split("package.json")[0];
	const fileRead = await readFileAsync(file);
	const fileContent = JSON.parse(fileRead.toString());
	const name = fileContent.name;

	const currentVersion = fileContent.version;
	const suffix = currentVersion.toString().includes("rc") ? "" : "-dev";
	const version = `${currentVersion}${suffix}.${gitRev.slice(0,7,)}`;

	PACKAGES[name] = { name, file, fileContent, version, folder };
	return PACKAGES[name];
};

const updatePackageJSON = async pkg => {
	const file = pkg.file;
	const fileContent = pkg.fileContent;
	const dependencies = fileContent.dependencies;
	const devDependencies = fileContent.devDependencies;

	fileContent.version = pkg.version;
	dependencies && getDependencies(dependencies).forEach(dep => {
		fileContent.dependencies[dep] = PACKAGES[dep].version;
	});
	devDependencies && getDependencies(devDependencies).forEach(dep => {
		fileContent.devDependencies[dep] = PACKAGES[dep].version;
	});

	await writeFileAsync(file, JSON.stringify(fileContent, null, "  "));
};

const getDependencies = (dependencies) => {
	return Object.keys(dependencies).filter(dep => dep.startsWith(NPM_ORG));
};

const publishPackage = async pkg => {
	console.info(`Publish ${pkg.name}: ${pkg.version} ...`);
	execSync(`yarn publish ${pkg.folder} --tag=next --registry=http://localhost:4873/`);
};

run().catch(error => {
	console.error("Release of @next version failed", error);
});