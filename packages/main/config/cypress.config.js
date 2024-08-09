import cypressConfig from "@ui5/webcomponents-tools/components-package/cypress.config.js";
import path from "path";

const isWin = process.platform === "win32";
const __dirname = isWin ? path.parse(import.meta.url)['dir'].replace('file:///','') : path.dirname(new URL(import.meta.url).pathname);
cypressConfig.component.supportFile = path.join(__dirname, "cypress/support/component.js");

export default cypressConfig;
