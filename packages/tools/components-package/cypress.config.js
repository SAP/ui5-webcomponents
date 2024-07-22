const { defineConfig } = require('cypress')
const path = require("path");
const rootConfig = require("../../../vite.config.js");

module.exports = defineConfig({
  component: {
    supportFile: path.join(__dirname, "cypress/support/component.js"),
    indexHtmlFile: path.join(__dirname, "cypress/support/component-index.html"),
    specPattern: "test/specs/*.cy.{js,ts}",
    devServer: {
      framework: 'cypress-ct-lit',
      bundler: 'vite',
      viteConfig: rootConfig,
    }
  },
  video: false,
  screenshotOnRunFailure: false,
  scrollBehavior: false
})