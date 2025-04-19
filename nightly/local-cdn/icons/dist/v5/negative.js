import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "negative";
const pathData = "M406 32q31 0 52.5 21.5T480 106v299q0 31-22 53t-53 22H106q-31 0-52.5-21.5T32 406V106q0-31 21.5-52.5T106 32h300zm23 74q0-10-6.5-16.5T406 83H106q-10 0-16.5 6.5T83 106v300q0 10 6.5 16.5T106 429h299q10 0 17-7t7-17V106zm-71 124q11 0 18.5 7.5T384 256t-7.5 18.5T358 282H153q-11 0-18-7.5t-7-18.5 7-18.5 18-7.5h205z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/negative";
export { pathData, ltr, accData };