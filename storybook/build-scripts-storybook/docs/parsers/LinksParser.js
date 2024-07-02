import path from "path";
/**
 * This parser is responsible for parsing links in markdown files.
 * It parses links in the following format:
 * [text1](text2)
 * and replaces them with:
 * [text1](./?path=link)
 * where link is a path to the file that is being linked to.
 * It also removes numbers and dashes from directory and file names.
 * For example, the following link:
 * [text1](1-getting-started/01-first-steps.mdx)
 * will be replaced with:
 * [text1](./?path=/docs/docs-getting-started-first-steps--docs)
 */
export class LinksParser {
    async parse(file) {
        const content = this.parseContent(file);
        return {
            path: file.path,
            content,
        };
    }
    parseContent(file) {
        let { content, path: pathRelative } = file;
        const matches = content.match(LinksParser.GLOBAL_LINK_SEARCH);
        if (Array.isArray(matches)) {
            matches.forEach((match) => {
                const [_, text, link] = match.match(LinksParser.SEARCH) || [];
                if (!this.isMatch(link)) {
                    return;
                }
                const parsedLink = this.parseLink(link, pathRelative);
                const mdLink = `[${text}](./?path=${parsedLink})`;
                content = content.replace(match, mdLink);
            });
        }
        return content;
    }
    isMatch(link) {
        // check if link is relative
        return (Boolean(link) &&
            typeof link === "string" &&
            !link.startsWith("#") && // ignore anchors
            !LinksParser.ABSOLUTE_LINK_CHECK.test(link) // ignore absolute links
        );
    }
    parseLink(link, pathRelative) {
        // parse links from the following format:
        // "1-getting-started/01-first-steps.mdx"
        // to:
        // "/docs/docs-getting-started-first-steps--docs"
        const targetFileRelative = path.join(path.dirname(pathRelative), link);
        const pathRelativeParsed = targetFileRelative
            // remove .mdx or .md
            .replace(/\.(mdx|md)$/, "")
            // remove numbers and dash (1-, 01-, 02-, etc.) from the beginning of the file name
            .replace(/\/[0-9-]+/, "/")
            // remove numbers and dash (1-, 01-, 02-, etc.) from the beginning of string
            .replace(/^[0-9-]+/, "")
            // replace path.sep with dash
            .replaceAll(path.sep, "-");
        const parsedLink = `/docs/docs-${pathRelativeParsed.toLowerCase()}--docs`;
        return parsedLink;
    }
}
// match all links ([text1](text2)) that are not images (i.e. don't start with !)
LinksParser.MD_LINK_REGEX = /(?<!\!)\[(.*?)\]\((.*?)\)/;
LinksParser.SEARCH = new RegExp(LinksParser.MD_LINK_REGEX);
LinksParser.GLOBAL_LINK_SEARCH = new RegExp(LinksParser.MD_LINK_REGEX, "g");
LinksParser.ABSOLUTE_LINK_CHECK = /^(?:[a-z+]+:)?\/\//i;
//# sourceMappingURL=LinksParser.js.map