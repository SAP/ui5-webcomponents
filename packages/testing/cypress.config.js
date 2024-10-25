import { defineConfig } from 'cypress';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __processDir = process.cwd();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supportFilePath = "./cypress/support/component.js"; // relative to the config file
let supportFile = path.join(__dirname, supportFilePath);

if (existsSync(path.join(__processDir, supportFilePath))) {
	supportFile = path.join(__processDir, supportFilePath);
}

const indexHtmlFilePath = "./cypress/support/component-index.html"; // relative to the config file
let indexHtmlFile = path.join(__dirname, indexHtmlFilePath);

if (existsSync(path.join(__processDir, indexHtmlFilePath))) {
	indexHtmlFile = path.join(__processDir, indexHtmlFilePath);
}

const config = defineConfig({
	component: {
		// supportFile: supportFile,
		// indexHtmlFile: indexHtmlFile,
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
});

console.log("=====", config)

export default { config };
