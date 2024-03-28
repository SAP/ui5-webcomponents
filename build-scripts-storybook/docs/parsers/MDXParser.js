const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
/**
 * This parser is responsible for parsing markdown files and converting them to MDX.
 * Adds the following to the top of the file:
 * import { Meta } from '@storybook/blocks';
 * <Meta title="title" />
 * where title is the title of the article. The title is parsed from the file path.
 */
export class MDXParser {
    constructor(options) {
        this.subTitle = options?.subTitle || undefined;
    }
    async parse(file) {
        const mdxTitle = this.getMdxTitle(file.path);
        return {
            path: this.parsePath(file.path),
            content: this.parseContent(file.content, mdxTitle),
        };
    }
    parsePath(path) {
        return path.replace(/\.md$/, ".mdx");
    }
    parseContent(content, articleName) {
        return `import { Meta } from '@storybook/blocks';
import { Footer } from "@sb/components/footer/Footer.tsx";

<Meta title="${articleName}" />

${content}
<Footer />`;
    }
    removePrefixNumbers(name) {
        return capitalize(name
            .replace(/\.md$/, "")
            // remove any number that prefixes the
            // name as well as the dash after it
            .replace(/^\d+-/, "")
            // trim any whitespace
            .replace(/^\s+|\s+$/g, "")
            // remove all dashes and replace them with spaces
            .replace(/-/g, " "));
    }
    getMdxTitle(path) {
        const fileParts = path.split("/");
        const fileName = fileParts[fileParts.length - 1];
        const articleName = this.removePrefixNumbers(fileName);
        const folderName = fileParts[fileParts.length - 2];
        let articleGroup = null;
        if (folderName) {
            articleGroup = this.removePrefixNumbers(folderName);
        }
        const parts = [
            this.subTitle ? capitalize(this.subTitle) : null,
            articleGroup ? capitalize(articleGroup) : null,
            articleName,
        ];
        const articleTitle = parts.filter(Boolean).join("/");
        return articleTitle;
    }
}
//# sourceMappingURL=MDXParser.js.map