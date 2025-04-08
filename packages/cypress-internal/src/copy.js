import { copyFile, mkdir } from "fs/promises";
import path from "path";

const dirname = import.meta.dirname;
const eslintInputPath = path.join(dirname, "./eslint.cjs");
const eslintOutputPath = path.join(dirname, "../dist/eslint.cjs");
const accReportIndexInputPath = path.join(dirname, "./acc_report/index");
const accReportIndexOutputPath = path.join(dirname, "../dist/acc_report/index");

await mkdir(path.dirname(eslintOutputPath), {recursive: true});
await copyFile(eslintInputPath, eslintOutputPath)
console.log("eslint.cjs copied successfully")

await mkdir(path.dirname(accReportIndexOutputPath), {recursive: true});
await copyFile(accReportIndexInputPath, accReportIndexOutputPath)
console.log("acc_report/index copied successfully")
