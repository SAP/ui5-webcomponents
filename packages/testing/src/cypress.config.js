import { defineConfig } from 'cypress';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supportFile = () => {
	const supportFilePath = "cypress/support/component";
	const supportedExtension = [".js", ".ts"]
	let supportFile = path.join(__dirname, `${supportFilePath}.js`);
	let packageFileExtension = supportedExtension.find(extension => existsSync(path.join(process.cwd(), `${supportFilePath}${extension}`)));

	if (packageFileExtension) {
		supportFile = path.join(process.cwd(), `${supportFilePath}${packageFileExtension}`);
	}

	return supportFile;
}

export default defineConfig({
	component: {
		supportFile: supportFile(),
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

