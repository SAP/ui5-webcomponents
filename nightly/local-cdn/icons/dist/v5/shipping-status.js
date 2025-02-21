import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "shipping-status";
const pathData = "M512 326q0 24-17 41t-41 17h-8q2 10 2 16 0 33-23.5 56.5T368 480t-56.5-23.5T288 400q0-6 2-16h-68q2 10 2 16 0 33-23.5 56.5T144 480t-56.5-23.5T64 400q0-6 2-16h-8q-24 0-41-17T0 326V90q0-24 17-41t41-17h236q24 0 41 17t17 41v6h70q17 0 23 14l64 128q3 4 3 10v78zM144 429q12 0 20.5-8.5T173 400t-8.5-20.5T144 371t-20.5 8.5T115 400t8.5 20.5T144 429zm317-154H326q-11 0-18-7t-7-18V90q0-7-7-7H58q-7 0-7 7v236q0 7 7 7h43q20-13 43-13 24 0 43 13h138q20-13 43-13 24 0 43 13h43q7 0 7-7v-51zm-93 154q12 0 20.5-8.5T397 400t-8.5-20.5T368 371t-20.5 8.5T339 400t8.5 20.5T368 429zm-16-205h93l-38-77h-55v77z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/shipping-status";
export { pathData, ltr, accData };