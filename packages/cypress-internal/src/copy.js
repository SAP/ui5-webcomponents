import { copyFile } from "fs/promises";
import path from "path";

const dirname = import.meta.dirname;

const files = [

];

await copyFile(path.join(dirname, "./eslint.cjs"), path.join(dirname, "../dist/eslint.cjs"))
console.log("eslint.cjs copied successfully")
await copyFile(path.join(dirname, "./acc_report/index"), path.join(dirname, "../dist/acc_report/index"))
console.log("acc_report/index copied successfully")
