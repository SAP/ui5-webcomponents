import type { IDocsParser } from ".";
import type { IFile } from "../DocsGenerator";
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
export declare class LinksParser implements IDocsParser {
    private static MD_LINK_REGEX;
    private static SEARCH;
    private static GLOBAL_LINK_SEARCH;
    private static ABSOLUTE_LINK_CHECK;
    parse(file: IFile): Promise<IFile>;
    private parseContent;
    private isMatch;
    private parseLink;
}
