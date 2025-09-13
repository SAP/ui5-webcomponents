import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "approvals";
const pathData = "M326 256q11 0 18.5 7.5T352 282t-7.5 18-18.5 7H186q-11 0-18.5-7t-7.5-18 7.5-18.5T186 256h140zm0 96q11 0 18.5 7.5T352 378t-7.5 18-18.5 7H186q-11 0-18.5-7t-7.5-18 7.5-18.5T186 352h140zm0-271q11 0 18.5 7.5T352 107q0 10-6 16l-88 100q-7 9-19 9-13 0-19-8l-53-55q-7-7-7-17 0-11 7.5-18.5T186 126q10 0 18 8l33 34 70-78q8-9 19-9zm64-81q24 0 41 17t17 41v396q0 24-17 41t-41 17H122q-24 0-41-17t-17-41V58q0-24 17-41t41-17h268zm7 58q0-7-7-7H122q-7 0-7 7v396q0 7 7 7h268q7 0 7-7V58z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/approvals";
export { pathData, ltr, accData };