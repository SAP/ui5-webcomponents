import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sap-box";
const pathData = "M509 176q3 6 3 13v195q0 8-4 14.5t-12 9.5L243 509q-6 3-13 3-6 0-11-3L14 405q-14-6-14-23V122q0-19 17-24L278 2q6-2 9-2 6 0 12 3l149 77q7 3 11 10zm-207 64q-14-6-14-22v-50l-131-67-67 24 101 52q7 3 10 10l52 88q3 6 3 13v160l77-30V257zM51 366l154 79V306l-34-23q-11-8-11-21v-43L51 163v203zm410 1V204l-31-16q-14-8-14-23v-44L286 54l-64 23 97 49q8 4 10 10l52 88q3 6 3 13v160z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sap-box";
export { pathData, ltr, accData };