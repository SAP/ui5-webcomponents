import { globby } from "globby";
import * as esbuild from 'esbuild'
import * as fs from "fs";

/**
 * Creates an esbuild plugin that removes development mode code from UI5Element files
 * @param {Object} options - Plugin options
 * @param {RegExp} options.filter - File filter pattern (default: /UI5Element.ts$/)
 * @param {string[]} options.devModeReplacements - Development mode code patterns to remove
 * @returns {Object} esbuild plugin
 */
export const createDevModeRemovalPlugin = (options = {}) => {
  const {
    filter = /UI5Element.ts$/,
    devModeReplacements = [
      { pattern: /const DEV_MODE = true/g, replacement: "" },
      { pattern: /if \(DEV_MODE\)/g, replacement: "if (false)" }
    ]
  } = options;

  return {
    name: 'ui5-dev-mode-removal',
    setup(build) {
      build.onLoad({ filter }, async (args) => {
        let text = await fs.promises.readFile(args.path, 'utf8');

        // Apply all dev mode replacements
        for (const { pattern, replacement } of devModeReplacements) {
          text = text.replaceAll(pattern, replacement);
        }

        return {
          contents: text,
          loader: 'ts',
        };
      });
    },
  };
};

/**
 * Creates a default esbuild configuration for removing dev mode
 * @param {Object} options - Configuration options
 * @param {string|string[]} options.entryPoints - Entry points glob pattern or array
 * @param {string} options.outdir - Output directory
 * @param {string} options.outbase - Output base directory
 * @param {boolean} options.bundle - Whether to bundle files
 * @param {boolean} options.minify - Whether to minify output
 * @param {boolean} options.sourcemap - Whether to generate sourcemaps
 * @param {Object} options.pluginOptions - Options for the dev mode removal plugin
 * @returns {Promise<Object>} esbuild configuration
 */
export const createDevModeConfig = async (options = {}) => {
  const {
    entryPoints = "src/**/*.ts",
    outdir = 'dist/prod',
    outbase = 'src',
    bundle = false,
    minify = true,
    sourcemap = true,
    pluginOptions = {}
  } = options;

  const resolvedEntryPoints = Array.isArray(entryPoints)
    ? entryPoints
    : await globby(entryPoints);

  return {
    entryPoints: resolvedEntryPoints,
    bundle,
    minify,
    sourcemap,
    outdir,
    outbase,
    plugins: [
      createDevModeRemovalPlugin(pluginOptions),
    ]
  };
};

/**
 * Removes development mode code from TypeScript files
 * @param {Object} options - Build options (same as createDevModeConfig)
 * @returns {Promise<Object>} esbuild result
 */
export const removeDevMode = async (options = {}) => {
  const config = await createDevModeConfig(options);
  return await esbuild.build(config);
};

// Default export for backward compatibility
export default removeDevMode;

// // If this file is run directly, execute with default configuration
// if (import.meta.url === `file://${process.argv[1]}`) {
//   const config = await createDevModeConfig();
//   const result = await esbuild.build(config);
//   console.log('Dev mode removal completed:', result);
// }