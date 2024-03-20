const { defineConfig } = require('cypress')
const path = require("path");

module.exports = defineConfig({
  component: {
    supportFile: path.join(__dirname, "cypress/support/component.js"),
    indexHtmlFile: path.join(__dirname, "cypress/support/component-index.html"),
    specPattern: "test/specs/*.cy.js",
    devServer: {
      framework: 'cypress-ct-lit',
      bundler: 'vite',
      viteConfig: {}
    }
  },
  video: false,
  screenshotOnRunFailure: false,
  scrollBehavior: false
})