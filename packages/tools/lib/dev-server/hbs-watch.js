const processFile = require("../hbs2ui5/index.js").processFile;
const path = require('path');

process.env.UI5_TS = true;
const hbsWatch = async () => {
	return {
		name: 'hbs-watch',
		async load(id) {
			if (id.endsWith(".lit.ts")) {
				const hbsFile = id.replace("generated/templates/", "").replace("Template.lit.ts", ".hbs")
				// wait for the write so the real load hook can read it from the file system
				const filesIncluded = await processFile(hbsFile, path.dirname(id))

				// add this .hbs and all included .hbs files to watch and recompile
				this.addWatchFile(hbsFile)
				filesIncluded.forEach(fileName => {
					this.addWatchFile(fileName);
				})
			}
		}
	}
};

module.exports = hbsWatch;
