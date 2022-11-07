const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const capitalizeFirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

const srcPath = path.resolve(process.argv[2]); // where to find the .mds
const destPath = path.resolve(process.argv[3]); // where to create the output

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
        articles.forEach(article => {
            if (article.endsWith("README.md")) return; // skip the top-level readme
            const articlePath = path.join(srcFilePath, article);
            let articleContent = `${fs.readFileSync(articlePath)}`;

            const articleHumanReadableName = capitalizeFirst(article.replace(/^[0-9\-\.]+/, "").replace(/\.md$/, "").replace(/-/g, " "));
            articleContent = `
import { Meta } from '@storybook/addon-docs';

<Meta title="Docs/${humanReadableName}/${articleHumanReadableName}" />

${articleContent}`;
            fs.writeFileSync(path.join(sectionDir, article.replace(/\.md$/, ".stories.mdx")), articleContent);
        });
    } else {
        // create a standalone article outside the directory structure (f.e. FAQ)
        let articleContent = `${fs.readFileSync(srcFilePath)}`;
        const cleanName = file.replace(/^[0-9\-\.]+/, "");
        articleContent = `
import { Meta } from '@storybook/addon-docs';

<Meta title="${cleanName.replace(/\.md$/, "")}" />

${articleContent}`;
        fs.writeFileSync(
            path.join(destPath, cleanName.replace(/\.md$/, ".stories.mdx")),
            articleContent
        );
    }
});
