const { defineConfig } = require('cypress')
const path = require("path");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1234',
    supportFile: path.join(__dirname, "cypress/support/e2e.js"),
    specPattern: "test/specs/*.cy.js"
  },
  video: false,
  screenshotOnRunFailure: false,
  scrollBehavior: false
})