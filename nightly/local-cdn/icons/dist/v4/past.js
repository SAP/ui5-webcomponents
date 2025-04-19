import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "past";
const pathData = "M2 288h34q6 40 25.5 75.5t48.5 61 66.5 40.5 79.5 15q47 0 87.5-17.5t71-48 48-71.5 17.5-87q0-39-12.5-74T433 118.5t-52-49T315 40V7q42 10 78.5 33T456 95.5t41 73.5 15 87q0 53-20 99.5T437.5 437 356 492t-100 20q-49 0-92-17.5T87 447t-56.5-71T2 288zM15 61q8-1 12.5 3.5T33 76v57q26-46 66.5-78.5T192 8v34q-45 14-80 44t-55 72l61-5q6-1 10.5 3.5T134 168q0 16-14 16l-84 8q-31 0-35-31V77q0-6 4-11t10-5zm385 227H224V144q0-16 16-16t16 16v112h144q16 0 16 15 0 7-4.5 12t-11.5 5z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/past";
export { pathData, ltr, accData };