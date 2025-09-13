import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sales-order-item";
const pathData = "M192 0h224q14 0 23 9.5t9 22.5v448q0 14-9 23t-22 9H97q-14 0-23.5-9T64 480V128zm225 480l-1-448H224v96q0 14-9.5 23t-22.5 9H96v320h321zM259 261l33-3q2 11 8 19 4 5 6 6.5t7 3.5v-55q-27-8-38-21.5T264 175q0-21 14.5-35t34.5-16v-15h18v15q42 4 48 45l-30 4q-2-11-7-15.5t-11-6.5v51q31 8 42 21t11 35q0 25-15 39t-38 19v24h-18v-23q-23-3-36-16t-18-40zm-132-21q0-7 5-11.5t11-4.5h65q16 0 16 16 0 6-4.5 11t-11.5 5h-65q-6 0-11-5t-5-11zm0 65q0-7 5-11.5t11-4.5h65q16 0 16 16 0 6-4.5 11t-11.5 5h-65q-6 0-11-5t-5-11zm204-67v49q10 0 16-8t6-17q0-7-4.5-14T331 238zm-31-51q2 2 5 4.5t8 4.5v-45q-17 9-17 23 0 6 4 13z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/sales-order-item";
export { pathData, ltr, accData };