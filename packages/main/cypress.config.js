import cypressConfig from "@ui5/cypress-common/cypress.config.js";

cypressConfig.component.specPattern = suites[process.env.TEST_SUITE] || ["**/specs/**/*.cy.{js,ts,jsx,tsx}"];

export default cypressConfig;
