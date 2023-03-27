import type { IDocsParser } from ".";
import type { IFile } from "../DocsGenerator";
import path from "path";

export class LinksParser implements IDocsParser {
    // match all links ([text1](text2)) that are not images (i.e. don't start with !)
    private static MD_LINK_REGEX = /(?<!\!)\[(.*?)\]\((.*?)\)/;
    private static SEARCH = new RegExp(LinksParser.MD_LINK_REGEX);
    private static GLOBAL_LINK_SEARCH = new RegExp(
        LinksParser.MD_LINK_REGEX,
        "g"
    );
    private static ABSOLUTE_LINK_CHECK = /^(?:[a-z+]+:)?\/\//i;

    public async parse(file: IFile): Promise<IFile> {
        const content = this.parseContent(file);

        return {
            path: file.path,
            content,
        };
    }

    private parseContent(file: IFile): string {
        let { content, path: pathRelative } = file;

        const matches = content.match(LinksParser.GLOBAL_LINK_SEARCH);

        if (Array.isArray(matches)) {
            matches.forEach((match) => {
                const [_, text, link] = match.match(LinksParser.SEARCH) || [];
                if (this.isMatch(link)) {
                    return;
                }
                const parsedLink = this.parseLink(link, pathRelative);
                const mdLink = `[${text}](./?path=${parsedLink})`;
                content = content.replace(match, mdLink);
            });
        }

        return content;
    }

    private isMatch(link: string): boolean {
        // check if link is relative
        return (
            Boolean(link) &&
            typeof link === "string" &&
            !link.startsWith("#") && // ignore anchors
            !LinksParser.ABSOLUTE_LINK_CHECK.test(link) // ignore absolute links
        );
    }

    private parseLink(link: string, pathRelative: string): string {
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
            // replace path.sep with dash
            .replace(new RegExp(path.sep, "g"), "-");

        const parsedLink = `/docs/docs-${pathRelativeParsed.toLowerCase()}--docs`;

        return parsedLink;
    }
}
