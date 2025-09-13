import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "measure";
const pathData = "M0 208V64h512v32h-32v80q0 16-16 16t-16-16V96h-32v112q0 16-16 16t-16-16V96h-32v80q0 16-16 16t-16-16V96h-32v112q0 16-16 16t-16-16V96h-32v80q0 16-16 16t-16-16V96h-32v112q0 16-16 16t-16-16V96H96v80q0 16-16 16t-16-16V96H32v112q0 16-16 16T0 208zm0 112h304l25-49q2-5 7-5t7 5l25 49h144v32H384l16 32h112v32h-96l10 21q2 4 0 7.5t-7 3.5H253q-5 0-7-3.5t0-7.5l10-21H0v-32h272l16-32H0v-32zm292 96h88l-44-88z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/measure";
export { pathData, ltr, accData };