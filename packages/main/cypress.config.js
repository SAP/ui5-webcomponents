import "@ui5/webcomponents-testing/src/cypress/support/component.js";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cypressConfig.component.supportFile = path.join(__dirname, "cypress/support/component.ts");

export default cypressConfig;