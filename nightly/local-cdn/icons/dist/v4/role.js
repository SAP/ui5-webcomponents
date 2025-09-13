import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "role";
const pathData = "M320 512H0v-64q0-26 10-49.5t27.5-41 41-27.5 49.5-10h32q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28h32q27 0 50 10t40.5 27.5T310 398t10 50v64zm-32-352q0-11 5-18t11-10q7-4 16-4V64q0-6 3.5-16.5t12.5-21T361 8t40-8 39 6 24 15 12.5 20.5T480 64v6l-32 1v-7q0-2-.5-7t-5-10.5-14-10T401 32t-28 5-15 11q-4 7-6 16v64h128q10 1 16 5 6 3 11 9.5t5 17.5v96q0 11-10.5 21.5T480 288H320q-9 0-16-4-6-3-11-9.5t-5-18.5v-96zM32 448v32h256v-32q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68zm64-224q0 27 19 45.5t45 18.5 45-18.5 19-45.5q0-26-19-45t-45-19-45 19-19 45zm341 32l-21-37q7-4 11.5-11t4.5-16q0-13-9-22.5t-23-9.5-23 9.5-9 22.5q0 9 4.5 16t11.5 11l-19 37h72z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/role";
export { pathData, ltr, accData };