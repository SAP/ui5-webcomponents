import type { IDocsParser } from "./";
import type { IFile } from "../DocsGenerator";

const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

interface IMDXParserOptions {
    subTitle?: string;
}
export class MDXParser implements IMDXParserOptions, IDocsParser {
    public readonly subTitle: string | undefined;

    constructor(options?: IMDXParserOptions) {
        this.subTitle = options?.subTitle || undefined;
    }

    public async parse(file: IFile): Promise<IFile> {
        const mdxTitle = this.getMdxTitle(file.path);
        const content = this.removeMetadata(file.content);

        return {
            path: this.parsePath(file.path),
            content: this.parseContent(content, mdxTitle),
        };
    }

    private parsePath(path: string): string {
        return path.replace(/\.md$/, ".mdx");
    }

    private parseContent(content: string, articleName: string): string {
        return `import { Meta } from '@storybook/blocks';

<Meta title="${articleName}" />

${content}`;
    }

    private removePrefixNumbers(name: string): string {
        return capitalize(
            name
                .replace(/\.md$/, "")
                // remove any number that prefixes the
                // name as well as the dash after it
                .replace(/^\d+-/, "")
                .replace(/^\s+|\s+$/g, "")
                // remove all dashes and replace them with spaces
                .replace(/-/g, " ")
        );
    }

    private getMdxTitle(path: string): string {
        const fileParts = path.split("/");
        const fileName = fileParts[fileParts.length - 1];
        const articleName = this.removePrefixNumbers(fileName);

        const folderName = fileParts[fileParts.length - 2];
        let articleGroup: string | null = null;
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

    private removeMetadata(content: string): string {
        return content.replace(/^---[\s\S]+?---/g, "");
    }
}
