import { copyFile } from "fs/promises";
import path from "path";

const dirname = import.meta.dirname;

await copyFile(path.join(dirname, "./eslint.cjs"), path.join(dirname, "../dist/eslint.cjs"))

console.log("eslint.cjs copied successfully")