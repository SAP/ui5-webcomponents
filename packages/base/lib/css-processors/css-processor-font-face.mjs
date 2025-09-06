import * as esbuild from 'esbuild'
import * as path from "path";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";

/**
 * Processes font-face CSS declarations by updating URLs and filtering content
 * @param {string} text - CSS text containing @font-face declarations
 * @param {Object} options - Processing options
 * @param {string} options.cdnUrl - CDN URL template for fonts
 * @param {string} options.version - Package version for CDN URL
 * @param {string[]} options.excludeFonts - Font families to exclude (default: ["SAP-icons"])
 * @param {boolean} options.removeWoff - Whether to remove woff format URLs (default: true)
 * @returns {string} Processed CSS text
 */
export const processFontFace = (text, options = {}) => {
    const {
        cdnUrl = "https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@{version}/content/Base/baseLib/baseTheme/fonts",
        version,
        excludeFonts = ["SAP-icons"],
        removeWoff = true
    } = options;

    const declarationExpr = /@font-face\s*{[^}]*}/g;

    // change font-face src
    if (version) {
        const finalCdnUrl = cdnUrl.replace("{version}", version);
        text = text.replaceAll("../baseTheme/fonts", finalCdnUrl);
    }

    // extract declarations for separate usage
    let fontFaceDeclarations = [...text.matchAll(declarationExpr)].map(x => x[0]);

    // remove excluded fonts
    if (excludeFonts.length > 0) {
        fontFaceDeclarations = fontFaceDeclarations.filter(decl => 
            !excludeFonts.some(font => decl.includes(font))
        );
    }

    // remove woff urls if requested
    if (removeWoff) {
        fontFaceDeclarations = fontFaceDeclarations.map(decl => {
            // @font-face {
            //     src: url(../baseTheme/fonts/72-Semibold.woff2) format("woff2"), url(../baseTheme/fonts/72-Semibold.woff) format("woff"), local("72-Semibold");
            return decl.replace(/,url\(([^)]+)\.woff\)\ format\("woff"\)/, '');
        });
    }

    return fontFaceDeclarations.join("\n");
};

/**
 * Creates an esbuild plugin for processing font-face CSS
 * @param {Object} options - Plugin options
 * @param {string} options.outputPath - Output file path for generated CSS
 * @param {Object} options.processingOptions - Options passed to processFontFace function
 * @param {boolean} options.generateTypeScript - Whether to generate TypeScript export (default: true)
 * @returns {Object} esbuild plugin
 */
export const createFontFacePlugin = (options = {}) => {
    const {
        outputPath = path.join(process.cwd(), "src/generated/css/FontFace.css.ts"),
        processingOptions = {},
        generateTypeScript = true
    } = options;

    return {
        name: 'fontface-processor',
        setup(build) {
            build.initialOptions.write = false;

            build.onEnd(result => {
                result.outputFiles.forEach(async f => {
                    const processedText = processFontFace(f.text, processingOptions);
                    
                    if (generateTypeScript) {
                        const tsContent = `export default \`${processedText}\``;
                        await writeFile(outputPath, tsContent);
                    } else {
                        const cssPath = outputPath.replace(/\.ts$/, '');
                        await writeFile(cssPath, processedText);
                    }
                });
            });
        },
    };
};

/**
 * Creates esbuild configuration for font-face processing
 * @param {Object} options - Configuration options
 * @param {string} options.themePackage - Theme package name (default: "@sap-theming/theming-base-content")
 * @param {string} options.cssFile - CSS file path within the package (default: "content/Base/baseLib/sap_horizon/css_variables.css")
 * @param {boolean} options.bundle - Whether to bundle (default: true)
 * @param {boolean} options.minify - Whether to minify (default: true)
 * @param {string[]} options.external - External dependencies (default: ["*.ttf", "*.woff", "*.woff2"])
 * @param {Object} options.pluginOptions - Options for the font-face plugin
 * @returns {Promise<Object>} esbuild configuration
 */
export const createFontFaceConfig = async (options = {}) => {
    const {
        themePackage = "@sap-theming/theming-base-content",
        cssFile = "content/Base/baseLib/sap_horizon/css_variables.css",
        bundle = true,
        minify = true,
        external = ["*.ttf", "*.woff", "*.woff2"],
        pluginOptions = {}
    } = options;

    // Get theme package version
    const themeBasePackage = JSON.parse(
        await readFile(fileURLToPath(import.meta.resolve(`${themePackage}/package.json`)), "utf-8")
    );

    // Resolve the actual CSS file path
    const themeBaseFile = fileURLToPath(import.meta.resolve(`${themePackage}/${cssFile}`));

    // Set up processing options with version
    const processingOptions = {
        version: themeBasePackage.version,
        ...pluginOptions.processingOptions
    };

    return {
        stdin: {
            contents: `@import ${JSON.stringify(themeBaseFile)};`,
            resolveDir: './',
            sourcefile: 'virtual-font-face.css',
            loader: 'css',
        },
        bundle,
        minify,
        plugins: [
            createFontFacePlugin({
                ...pluginOptions,
                processingOptions
            }),
        ],
        external,
    };
};

/**
 * Processes font-face CSS and generates TypeScript output
 * @param {Object} options - Processing options (same as createFontFaceConfig)
 * @returns {Promise<Object>} esbuild result
 */
export const processFontFaceCSS = async (options = {}) => {
    const config = await createFontFaceConfig(options);
    return await esbuild.build(config);
};

// Default export for backward compatibility
export default processFontFaceCSS;

// // If this file is run directly, execute with default configuration
// if (import.meta.url === `file://${process.argv[1]}`) {
//     const config = await createFontFaceConfig();
//     const result = await esbuild.build(config);
//     console.log('Font-face CSS processing completed:', result);
// }