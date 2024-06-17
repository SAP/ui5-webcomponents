import cypressConfig from "@ui5/webcomponents-tools/components-package/cypress.config.js";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

cypressConfig.component.supportFile = path.join(__dirname, "cypress/support/component.js");

export default cypressConfig;
