import { defineComponentFramework } from "cypress";

const basePkg: Cypress.CypressComponentDependency = {
  // Unique, semantic identifier.
  type: "ui5-webc-base",
  // Human readable name.
  name: "UI5 Web Components base",
  // Package name install from `npm`.
  package: "@ui5/webcomponents-base",

  /**
   * Similar to package, but can include a version or tag.
   * Used during setup to generate an install command for users.
   * Eg: `solid-js@next`
   */
  installer: "@ui5/webcomponents-base@^2.6.0",

  // Human readable description.
  description: "A required dependency for this project",

  // Minimum supported version.
  minVersion: "^2.6.0",
};

/**
 * The definition.
 */
export default defineComponentFramework({
  /**
   * This should match the `npm` package name.
   * The convention required to ensure your Definition is processed
   * by Cypress is `cypress-ct-*` for global packages, or
   * `@org/cypress-ct-*` for organization level packages.
   */
  type: "@ui5/cypress-ct-ui5-webc",

  /**
   * The label that shows up when configuring Component Testing
   * for the first time.
   */
  name: "UI5 Web Components",

  /**
   * Supported bundlers. Can be "webpack" and/or "vite".
   */
  supportedBundlers: ["vite"],

  /**
   * Used by Cypress to automatically detect the correct Framework Definition
   * based on the user's project.
   * In this example, if a module matching `solidDep`
   * is found in the user's project,
   * Solid.js will automatically be selected when configuring Component Testing.
   */
  detectors: [basePkg],

  /**
   * Optionally, some conditional logic, based on whether
   * the user selected Vite or webpack.
   */
  dependencies: (bundler) => {
    return [basePkg];
  },
});
