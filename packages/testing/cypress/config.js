import { defineConfig } from 'cypress';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import merge from "deepmerge";

const __processDir = process.cwd();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supportFilePath = (ext = ".js") => `./support/component${ext}`; // relative to the config file
const indexHtmlFilePath = "./support/component-index.html"; // relative to the config file

const intialConfig = () => ({
	component: {
		specPattern: ["**/specs/*.cy.{js,ts}", "**/specs/**/*.cy.{js,ts}"],
		devServer: {
			framework: 'cypress-ct-lit',
			bundler: 'vite',
		}
	},
	video: false,
	screenshotOnRunFailure: false,
	scrollBehavior: false,
	viewportHeight: 1080,
	viewportWidth: 1440,
})

const defineCypressConfig = (externalConrfig = {}) => {
	let supportFile;
	let indexHtmlFile;
	const config = intialConfig();

	if (externalConrfig.component?.supportFile) {
		console.log("===== Found supportFile")
		supportFile = typeof externalConrfig.component.supportFile === "string" ?
			path.join(__processDir, externalConrfig.component.supportFile) : externalConrfig.component?.supportFile
	} else if (!existsSync(path.join(__processDir, "cypress", supportFilePath())) && !existsSync(path.join(__processDir, "cypress", supportFilePath(".ts")))) {
		console.log("===== Not found supportFile")
		supportFile = path.join(__dirname, supportFilePath());
	}

	if (externalConrfig.component?.indexHtmlFile) {
		console.log("===== Found indexHtmlFile")
		indexHtmlFile = path.join(__processDir, externalConrfig.component.indexHtmlFile)
	} else if (!existsSync(path.join(__processDir, "cypress", indexHtmlFilePath))) {
		console.log("===== Not found indexHtmlFile")
		indexHtmlFile = path.join(__dirname, indexHtmlFilePath);
	}

	config.component.supportFile = supportFile;
	config.component.indexHtmlFile = indexHtmlFile;

	return defineConfig(merge(config, externalConrfig));
};

export { defineCypressConfig }
