const path = require("path");
const replacestream = require("replacestream");
const log = require("@ui5/logger").getLogger("builder:customtask:RewriteBootstrap");

/**
 * Task to rewrite the bootstrap of the index.html
 *
 * @param {Object} parameters Parameters
 * @param {DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {AbstractReader} parameters.dependencies Reader or Collection to read dependency files
 * @param {Object} parameters.options Options
 * @param {string} parameters.options.projectName Project name
 * @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
 * @returns {Promise<undefined>} Promise resolving with undefined once data has been written
 */
module.exports = function({workspace, dependencies, options}) {
	return workspace.byGlob("/resources/playground/playground.html").then((resources) => {
        resources.forEach((resource) => {
            log.info("Replacing bootstrap in file " + resource.getPath());
            const stream = resource.getStream()
                .pipe(replacestream("resources/sap-ui-core.js", "resources/sap-ui-custom.js"))
                .pipe(replacestream('"playground": "./"', '"playground": "./", "": "https://openui5.hana.ondemand.com/resources/"'));
            resource.setStream(stream);
            workspace.write(resource);
        });
    });
};