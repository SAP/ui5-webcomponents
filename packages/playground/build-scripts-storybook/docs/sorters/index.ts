export * from "./ChangelogSorter2";

import { IFile } from "../DocsGenerator";

export interface IDocsSorter {
    sort(files: IFile[]): IFile[];
}
