const mkdirp = require("mkdirp");
const child_process = require("child_process");
const path = require("path");
const LIB = path.join(__dirname, `../../lib/`);


let packageName = process.argv.find((value) => {
	return value.includes("packageName");
});

if (packageName) {
	packageName = packageName.replace("--packageName=", "");
}

console.log(`${packageName}:[build-templates][pid${process.pid}]: Taking ${JSON.stringify(process.memoryUsage().rss / 1024 / 1024)}MB memory`)

mkdirp("src/generated/templates").then(() => {
	child_process.execSync(`cross-env UI5_TS=true node ${LIB}/hbs2ui5/index.js -d src/ -o src/generated/templates`, { stdio: "inherit" });
	console.log(`${packageName}:[build-templates][pid${process.pid}]: Taking ${JSON.stringify(process.memoryUsage().rss / 1024 / 1024)}MB memory`)
})