export * from "./ChangelogSorter";
import { IFile } from "../DocsGenerator";
export interface IDocsSorter {
    sort(files: IFile[]): IFile[];
}
