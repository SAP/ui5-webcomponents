const fs = require('fs');
const path = require('path');
const prependFile = require('prepend-file');
const replace = require('replace-in-file');

const packages = [
    "fiori",
    "main",
];

packages.forEach(package => {
    const pagesPath = `../${package}/dist/test-resources/pages/`;

    fs.mkdirSync(`./docs/pages/content/${package}`, {recursive: true});

    fs.readdir(pagesPath, async (err, files) => {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        await Promise.all(files.map(async (file, index) => {
			let results;
            const dirPath = path.join(pagesPath, file);
            // if directory, skip it
            if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
                return;
            }

            //Copy pages
            fs.copyFileSync(dirPath, path.join(process.cwd(), `/docs/pages/content/${package}/${file}`));

			// Step 1 - just change the URLs
            results = await replace({
                files: `./docs/pages/content/${package}/${file}`,
                from: [
                    /\.\.\/\.\.\/webcomponentsjs/g, // polyfill
                    /\.\.\/\.\.\/resources/g, // js bundles
					/\.\/img\//g, // images
					/styles\//g, // css
					`./kitchen-styles.css`, // the kitchen has an extra css
					`./kitchen-scripts.js`, // the kitchen has an extra js
				],
                to: [
                    `/assets/js/webcomponentsjs`,
                    `/assets/js/ui5-webcomponents`,
					`/assets/js/ui5-webcomponents/${package}/img/`,
					`/assets/js/ui5-webcomponents/${package}/styles/`,
					`/assets/js/ui5-webcomponents/main/kitchen-styles.css`,
					`/assets/js/ui5-webcomponents/main/kitchen-scripts.js`
                ]
            });

			// Step 2 - every attribute that has "assets/js" in its value -> transformed to the jekyll syntax
			results = await replace({
				files: `./docs/pages/content/${package}/${file}`,
				from: /([a-zA-Z0-9_\-]+)="([^"]*assets\/js\/[^"]*)"/g,
				to: `$1="{{ "$2" | absolute_url }}"`,
			});

			//Get current component name
			const currentPageName = file.slice(0, file.indexOf('.'));

			prependFile(path.join(process.cwd(), `/docs/pages/content/${package}`, file),
				`---
title: ${currentPageName.replace(/([A-Z])/g, " $1").trim()}
permalink: /playground/${package}/pages/${currentPageName}/
nav_exclude: true
---
`,
				err => {
					if (err) {
						// Error
						console.log(`Error: Can't prepend to ${file}`);
					}
				})
        }));
    });
});
