import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "account";
const pathData = "M464 32q16 0 16 16 0 6-4.5 11T464 64H336q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h128zM288 191q0 40-28 68t-68 28-68-28-28-68 28-68 68-28 68 28 28 68zm176-95q16 0 16 16 0 6-4.5 11t-11.5 5H336q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h128zM192 255q26 0 45-19t19-45q0-27-19-45.5T192 127q-27 0-45.5 18.5T128 191q0 26 18.5 45t45.5 19zm272-95q16 0 16 16 0 6-4.5 11t-11.5 5H336q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h128zM224 288q26 0 49.5 10t41 27 27.5 40 10 50v65H32v-65q0-27 10-50t27.5-40 40.5-27 50-10h64zm96 127q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68v32h256v-32z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/account";
export { pathData, ltr, accData };