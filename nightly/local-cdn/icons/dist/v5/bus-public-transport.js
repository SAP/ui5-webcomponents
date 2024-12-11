import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bus-public-transport";
const pathData = "M160 288q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm192 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm160-122q0 11-7.5 18.5T486 192h-22v198q0 24-17 41t-40 17h-10v38q0 11-7 18.5t-18 7.5-18.5-7.5T346 486v-38H166v38q0 11-7 18.5t-18 7.5-18.5-7-7.5-18v-39h-9q-24 0-41-17t-17-41V192H26q-11 0-18.5-7.5T0 166v-44q0-11 7.5-18.5T26 96q15 0 22 14V58q0-24 17-41t41-17h301q23 0 40 17t17 41v50q8-12 22-12 10 0 18 7t8 18v45zM106 51q-7 0-7 7v147h314V58q0-7-6-7H106zm301 346q6 0 6-7V256H99v134q0 7 7 7h301z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/bus-public-transport";
export { pathData, ltr, accData };