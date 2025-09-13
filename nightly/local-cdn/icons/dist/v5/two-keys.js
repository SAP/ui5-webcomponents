import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "two-keys";
const pathData = "M26 160q-11 0-18.5-7.5T0 134q0-6 3-12l26-45q8-13 22-13h222q17-29 46.5-46.5T384 0q27 0 50 10t40.5 27.5T502 78t10 50-10 50-27.5 40.5T434 246t-50 10q-45 0-79-27t-45-69h-55v19q0 11-7.5 18.5T179 205t-18-7.5-7-18.5v-19h-52v19q0 11-7 18.5T77 205t-18.5-7.5T51 179v-19H26zM384 51q-32 0-54.5 22.5T307 128t22.5 54.5T384 205t54.5-22.5T461 128t-22.5-54.5T384 51zm125 327q3 6 3 12 0 11-7.5 18.5T486 416h-25v19q0 11-7.5 18.5T435 461t-18-7.5-7-18.5v-19h-52v19q0 11-7 18.5t-18 7.5-18.5-7.5T307 435v-19h-55q-11 42-45 69t-79 27q-27 0-50-10t-40.5-27.5T10 434 0 384t10-50 27.5-40.5T78 266t50-10q35 0 64.5 17.5T239 320h222q16 0 22 13zm-381 83q32 0 54.5-22.5T205 384t-22.5-54.5T128 307t-54.5 22.5T51 384t22.5 54.5T128 461z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/two-keys";
export { pathData, ltr, accData };