import type { IDocsParser } from "./";
import type { IFile } from "../DocsGenerator";
interface IMDXParserOptions {
    subTitle?: string;
}
/**
 * This parser is responsible for parsing markdown files and converting them to MDX.
 * Adds the following to the top of the file:
 * import { Meta } from '@storybook/blocks';
 * <Meta title="title" />
 * where title is the title of the article. The title is parsed from the file path.
 */
export declare class MDXParser implements IDocsParser {
    readonly subTitle: string | undefined;
    constructor(options?: IMDXParserOptions);
    parse(file: IFile): Promise<IFile>;
    private parsePath;
    private parseContent;
    private removePrefixNumbers;
    private getMdxTitle;
}
export {};
