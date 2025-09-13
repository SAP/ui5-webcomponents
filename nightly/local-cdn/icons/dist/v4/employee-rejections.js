import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "employee-rejections";
const pathData = "M322 512H2v-64q0-27 10-50t27.5-40.5 41-27.5 49.5-10h32q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28h32q26 0 49.5 10t41 27.5T312 398t10 50v64zM34 448v32h256v-32q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68zM318 32l32-32 65 64 63-64 32 32-65 63 65 65-32 32-63-65-65 65-32-32 65-65zM98 224q0 26 19 45t45 19 45-19 19-45q0-27-19-45.5T162 160t-45 18.5T98 224z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/employee-rejections";
export { pathData, ltr, accData };