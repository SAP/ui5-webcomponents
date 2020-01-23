const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const child_process = require("child_process");
const glob = require("glob-promise");
const execSync = child_process.execSync;
const gitRev = execSync("git rev-parse HEAD").toString();

const PACKAGES = {};
const NPM_ORG = "@ui5/webcomponents";
const OTP = process.argv[2];

const run = async () => {
	const FILES = await glob("**/packages/**/package.json", { 
		"ignore": ["**/node_modules/**/*.*", "**/dist/**/*.*", "**/playground/**/*.*"]
	});

	// Step 1: process package.json files
	const pkgs = await Promise.all(FILES.map(processPackageJSON));

	// Step 2: update package.json files
	await Promise.all(pkgs.map(updatePackageJSON));

	// Step 3: publish each package to npm
	pkgs.forEach(publishPackage);
};

const processPackageJSON = async file => {
	const folder = file.split("package.json")[0];
	const fileRead = await readFileAsync(file);
	const fileContent = JSON.parse(fileRead.toString());
	const name = fileContent.name;

	const version = `0.0.0-${gitRev.slice(0,9,)}`;

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

	return writeFileAsync(file, JSON.stringify(fileContent, null, "  "));
};

const getDependencies = (dependencies) => {
	return Object.keys(dependencies).filter(dep => dep.startsWith(NPM_ORG));
};

const publishPackage = pkg => {
	console.info(`Publish ${pkg.name}: ${pkg.version} ...`); // eslint-disable-line
	const OTP_PARAM = OTP ? `--otp=${OTP}` : ``;
	execSync(`yarn publish ${pkg.folder} --tag=next --new-version=${pkg.version} ${OTP_PARAM}`);
};

run().catch(error => {
	console.error("Release of @next version failed", error); // eslint-disable-line
});