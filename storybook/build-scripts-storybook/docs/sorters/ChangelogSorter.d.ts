import type { IDocsSorter } from "./index";
import type { IFile } from "../DocsGenerator";
/**
 * Sort changelog files by version number
 * e.g 1.3.2, 1.2.3-rc.3 1.2.3-rc.2 1.2.3-rc.1, 1.2.1, 1.2.0, rc16, rc15
 */
export declare class ChangelogSorter implements IDocsSorter {
    sort(files: IFile[]): IFile[];
    private parseVersion;
}
