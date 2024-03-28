export * from "./MDXParser";
export * from "./MetadataParser";
export * from "./LinksParser";
import { IFile } from "../DocsGenerator";
export interface IDocsParser {
    parse(file: IFile): Promise<IFile>;
}
