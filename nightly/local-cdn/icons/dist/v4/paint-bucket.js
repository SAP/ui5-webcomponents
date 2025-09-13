import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "paint-bucket";
const pathData = "M375 253q4 4 4 10 0 8-5 12L185 446q-4 4-11 4t-12-5L5 271q-4-6-4-11 0-7 6-11L178 94q3-2 3-5 0-2-2-6l-54-59q-2-4-2-6 0-4 3-5l12-11q1-2 5-2t6 2zm-34 9L206 112 40 262h301zm133 99q19 35 28.5 56t9.5 32q0 26-18.5 44.5T449 512t-44.5-18.5T386 449q0-17 12-42t26-46q14-23 25-23 7 0 13.5 8t11.5 15z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/paint-bucket";
export { pathData, ltr, accData };