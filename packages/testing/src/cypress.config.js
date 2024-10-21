import { defineConfig } from 'cypress';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	component: {
		supportFile: path.join(__dirname, "cypress/support/component.js"),
		indexHtmlFile: path.join(__dirname, "cypress/support/component-index.html"),
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