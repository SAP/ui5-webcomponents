const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const prependFile = require("prepend-file");

const srcPath = path.resolve(process.argv[2]); // where to find the .mds
const destPath = path.resolve(process.argv[3]); // where to create the output

const files = fs.readdirSync(srcPath);

files.forEach((file, fileIndex) => {
	const srcFilePath = path.join(srcPath, file); // f.e. "../../docs/4. Usage with Frameworks"
	const isDir = fs.lstatSync(srcFilePath).isDirectory();

	// Directory with articles
	if (isDir) {
		const cleanName = file.replace(/^[0-9 \.]+/, "");
		const shortName = file.replace(/^[0-9 \.]+/, "").replace(/ /g, "_").toLowerCase(); // becomes "usage-with-frameworks"
		const sectionDir = path.join(destPath, cleanName);
		rimraf.sync(sectionDir);
		fs.mkdirSync(sectionDir);

		// Get all articles in that directory
		const articles = fs.readdirSync(srcFilePath);
		articles.forEach((article, articleIndex) => {
			const articlePath = path.join(srcFilePath, article);
			let articleContent = `${fs.readFileSync(articlePath)}`;

			if (article.endsWith("About.md")) { // Create a top-level item

				articleContent = `---
layout: default
title: ${cleanName}
has_children: true
nav_order: ${fileIndex + 1}
permalink: /playground/${shortName}
---

${articleContent}

{:toc}`;

			} else { // Create a nested item

				const articleClean = article.replace(/^[0-9 \.]+/, "").replace(/\.md$/, "");
				const articleShortName = article.replace(/^[0-9 \.]+/, "").replace(/ /g, "_").replace(/\.md$/, "").toLowerCase();
				articleContent = `---
layout: docs
title: ${articleClean}
parent: ${cleanName}
nav_order: ${articleIndex + 1}
permalink: /playground/${shortName}/${articleShortName}/
---

${articleContent}`;

			}

			fs.writeFileSync(path.join(sectionDir, article), articleContent);

		});
	} else { // create a standalone article outside the directory structure (f.e. FAQ)
		let articleContent = `${fs.readFileSync(srcFilePath)}`;
		const shortName = file.replace(/^[0-9 \.]+/, "").replace(/ /g, "_").replace(/\.md$/, "").toLowerCase();
		const cleanName = file.replace(/^[0-9 \.]+/, "");
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
