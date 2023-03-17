const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const capitalizeFirst = str => str.substr(0,1).toUpperCase() + str.substr(1);

const srcPath = path.resolve(process.argv[2]); // where to find the .mds
const destPath = path.resolve(process.argv[3]); // where to create the output

const convertToTechnicalName = (name) => {
	return name.replace(/^[0-9\-\.]+/, "").replace(/ /g, "-").replace(/\.md$/, "").toLowerCase();
}

const files = fs.readdirSync(srcPath).filter(file => !["README.md", "images"].includes(file)); // skip the top-level readme

files.forEach((file, fileIndex) => {
	const srcFilePath = path.join(srcPath, file); // f.e. "../../docs/4. Usage with Frameworks"
	const isDir = fs.lstatSync(srcFilePath).isDirectory();

	// Directory with articles
	if (isDir) {
		const humanReadableName = capitalizeFirst(file.replace(/^[0-9\-\.]+/, "").replace(/-/g, " "));
		const technicalName = file.replace(/^[0-9\-\.]+/, "").toLowerCase(); // becomes "usage-with-frameworks"
		const sectionDir = path.join(destPath, technicalName);
		rimraf.sync(sectionDir);
		fs.mkdirSync(sectionDir);

		// Get all articles in that directory
		const articles = fs.readdirSync(srcFilePath);
		articles.forEach((article, articleIndex) => {
			const articlePath = path.join(srcFilePath, article);
			let articleContent = `${fs.readFileSync(articlePath)}`;

			if (article.endsWith("README.md")) { // Create a top-level item
				articleContent = articleContent.replaceAll(/\[.+\]\(\..+\)/g, e => {
					// Preproces markdown links to make them work in the playground.
					// All folder names (1-getting-started) and file names (01-first-steps.md)
					// should be transformed to not contain numbers.
					return e.replaceAll(/(\d+-(?:\w+-?)+)/g, convertToTechnicalName)
						// README.md file is replaced with generated HTML file whose
						// path is the folder where it is stored so the link should point only to the path.
						.replaceAll("/README.md", "")
						// File extensions should be removed from links.
						.replaceAll(".md", "");
				})


				articleContent = `---
layout: default
title: ${humanReadableName}
has_children: true
nav_order: ${fileIndex + 1}
permalink: /playground/${technicalName}
---

${articleContent}

{:toc}`;

			} else { // Create a nested item
				articleContent = articleContent.replaceAll(/\[.+\]\(\..+\)/g, e => {
					// Preproces markdown links to make them work in the playground.
					// All folder names (1-getting-started) and file names (01-first-steps.md)
					// should be transformed to not contain numbers.
					return e.replaceAll(/(\d+-(?:\w+-?)+)/g, convertToTechnicalName)
						// Jekyll creates a directory for each page to follow the
						// permalink structure so markdown links should be replaced with
						// one out folder backward.
						.replaceAll("(../", "(../../")
						.replaceAll("(./", "(../")
						// README.md file is replaced with generated HTML file whose
						// path is the folder where it is stored so the link should point only to the path.
						.replaceAll("/README.md", "")
						// File extensions should be removed from links.
						.replaceAll(".md", "");
				})

				const articleHumanReadableName = capitalizeFirst(article.replace(/^[0-9\-\.]+/, "").replace(/\.md$/, "").replace(/-/g, " "));
				const articleTechnicalName = convertToTechnicalName(article);
				articleContent = `---
layout: docs
title: ${articleHumanReadableName}
parent: ${humanReadableName}
nav_order: ${articleIndex + 1}
permalink: /playground/${technicalName}/${articleTechnicalName}/
---

${articleContent}`;

			}

			fs.writeFileSync(path.join(sectionDir, article), articleContent);

		});
	} else { // create a standalone article outside the directory structure (f.e. FAQ)
		let articleContent = `${fs.readFileSync(srcFilePath)}`;
		const shortName = convertToTechnicalName(file);
		const cleanName = file.replace(/^[0-9\-\.]+/, "");
		articleContent = `---
layout: docs
title: ${cleanName.replace(/\.md$/, "")}
nav_order: ${fileIndex + 1}
permalink: /playground/${shortName}
---

${articleContent}`;
		fs.writeFileSync(path.join(destPath, cleanName), articleContent);
	}
});
