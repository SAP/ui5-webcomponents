import { writeFile, readFile, mkdir } from "fs/promises";

const readOldContent = async (fileName) => {
    // it seems slower to read the old content, but writing the same content with no real changes
    // (as in initial build and then watch mode) will cause an unnecessary dev server refresh
    let oldContent = "";
    try {
        oldContent = (await readFile(fileName)).toString();
    } catch (e) {
        // file not found
    }
    return oldContent;
}

const writeFileIfChanged = async (fileName, content) => {
    const oldContent = await readOldContent(fileName);
    if (content !== oldContent) {
        if (!oldContent) {
            await mkdir(path.dirname(fileName), {recursive: true});
        }
        return writeFile(fileName, content);
    }
}

export { writeFileIfChanged }