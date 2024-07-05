import cypressConfig from "@ui5/webcomponents-tools/components-package/cypress.config.js";
import path from "path";

const __dirname = path.parse(import.meta.url)['dir'].replace('file:///','');
cypressConfig.component.supportFile = path.join(__dirname, "cypress/support/component.js");

export default cypressConfig;
