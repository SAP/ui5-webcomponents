import type { IDocsParser } from ".";
import type { IFile } from "../DocsGenerator";
export declare class MetadataParser implements IDocsParser {
    parse(file: IFile): Promise<IFile>;
    private removeMetadata;
}
