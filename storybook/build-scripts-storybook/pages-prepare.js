import { promises as fs } from "fs";
import path from "path";
import { DirectoryUtils } from "./DirectoryUtils";
class AssetsParser {
    parseContent(content) {
        const regex = /([a-zA-Z0-9_\-]+)="([^"]*assets\/[^"]*)"/g;
        const replacement = '$1="../../../..$2"';
        return content.replace(regex, replacement);
    }
}
/**
 * This class is responsible for reading and modifying the html files of the components located in the pages directory.
 * It uses parses to modify the content of the html files.
 */
class PagesPrepare {
    constructor(parsers, directoryUtils) {
        this.parsers = parsers;
        this.directoryUtils = directoryUtils;
    }
    async preparePages(pagesTarget, pagesSource) {
        if (!pagesTarget) {
            throw new Error("No pages directory provided");
        }
        if (!pagesSource) {
            throw new Error("No pages provided");
        }
        await this.directoryUtils.cleanDirectory(pagesTarget);
        const pages = (await fs.readdir(pagesSource)).filter((page) => page.endsWith(".html"));
        for (const page of pages) {
            const pagePath = path.join(pagesSource, page);
            const content = await this.directoryUtils.readContent(pagePath);
            const modifiedContent = this.modifyContent(content);
            const pageTargetPath = path.join(pagesTarget, page.replace(".html", ""), "index.html");
            await this.directoryUtils.assureDirectoryExistence(pageTargetPath);
            await this.directoryUtils.writeFile(pageTargetPath, modifiedContent);
        }
        return Promise.resolve();
    }
    modifyContent(content) {
        for (const parser of this.parsers) {
            content = parser.parseContent(content);
        }
        return content;
    }
}
const directoryUtils = new DirectoryUtils();
const parsers = [
    new AssetsParser()
];
const pagesPrepare = new PagesPrepare(parsers, directoryUtils);
const packages = [
    "main",
    "fiori"
];
for (const packageName of packages) {
    console.log(`Preparing pages for ${packageName}`);
    const pagesTarget = `./docs/storybook-pages/${packageName}/pages/`;
    const pagesSource = `../${packageName}/dist/test/pages/`;
    pagesPrepare.preparePages(pagesTarget, pagesSource)
        .then(() => console.log(`Pages for ${packageName} prepared`));
}
//# sourceMappingURL=pages-prepare.js.map