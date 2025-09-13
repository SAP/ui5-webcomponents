import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "shelf";
const pathData = "M486 0q11 0 18.5 7.5T512 26v460q0 11-7.5 18.5T486 512t-18-7.5-7-18.5v-51H51v51q0 11-7 18.5T26 512t-18.5-7.5T0 486V26Q0 15 7.5 7.5T26 0h460zM51 51v141h410V51H51zm135 96q-11 0-18.5-7t-7.5-18 7.5-18.5T186 96h140q11 0 18.5 7.5T352 122t-7.5 18-18.5 7H186zm275 237V243H51v141h410zm-135-96q11 0 18.5 7.5T352 314t-7.5 18-18.5 7H186q-11 0-18.5-7t-7.5-18 7.5-18.5T186 288h140z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/shelf";
export { pathData, ltr, accData };