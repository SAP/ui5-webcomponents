import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "hr-approval";
const pathData = "M320 512H0v-64q0-27 10-50t27.5-40.5 41-27.5 49.5-10h32q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28h32q26 0 49.5 10t41 27.5T310 398t10 50v64zM32 448v32h256v-32q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68zm128-160q26 0 45-19t19-45q0-27-19-45.5T160 160t-45 18.5T96 224q0 26 19 45t45 19zm137-180l32-32 50 51L480 0l32 32-132 159z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/hr-approval";
export { pathData, ltr, accData };