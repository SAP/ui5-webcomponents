import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pull-down";
const pathData = "M390 320q11 0 18.5 7.5T416 346q0 10-7 17L274 504q-6 8-18 8-11 0-19-8L103 363q-7-7-7-17 0-11 7.5-18.5T122 320q10 0 18 8l90 94V314q0-11 7.5-18.5T256 288t18.5 7.5T282 314v109l90-95q8-8 18-8zm-134-64q-29 0-32-28v-8q3-28 32-28 14 0 23 9t9 23-9 23-23 9zm0-96q-29 0-32-28v-8q3-28 32-28 14 0 23 9t9 23-9 23-23 9zm0-96q-29 0-32-28v-8q3-28 32-28 14 0 23 9t9 23-9 23-23 9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/pull-down";
export { pathData, ltr, accData };