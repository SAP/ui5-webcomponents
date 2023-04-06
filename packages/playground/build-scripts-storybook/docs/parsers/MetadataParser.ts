import type { IDocsParser } from ".";
import type { IFile } from "../DocsGenerator";

export class MetadataParser implements IDocsParser {
    public async parse(file: IFile): Promise<IFile> {
        const content = this.removeMetadata(file.content);

        return {
            path: file.path,
            content,
        };
    }

    private removeMetadata(content: string): string {
        return content.replace(/^---[\s\S]+?---/g, "");
    }
}
