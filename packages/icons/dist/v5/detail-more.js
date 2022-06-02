import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "detail-more";
const pathData = "M471 354q11 0 18 7.5t7 19.5q0 11-7 18.5t-18 7.5H266q-12 0-19-7.5t-7-18.5q0-12 7-19.5t19-7.5h205zm0-105q25 0 25 26t-25 26H266q-26 0-26-26t26-26h205zm-1-106q12 0 19 7.5t7 19.5q0 11-7 18.5t-19 7.5H259q-12 0-19-7.5t-7-18.5q0-12 7-19.5t19-7.5h211zM48 96q-12 0-22-9T16 64t10-23 22-9h416q12 0 22 9t10 23-10 23-22 9H48z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "detail-more";
export { pathData, ltr, accData };