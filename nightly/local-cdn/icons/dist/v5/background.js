import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "background";
const pathData = "M480 390q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268q38 0 64 26t26 64v268zm-397 2l90-96q8-8 19-8 7 0 14 4l41 26 87-87q9-7 18-7 7 0 11 3l66 32V122q0-17-11-28t-28-11H122q-17 0-28 11t-11 28v270zm85-184q-17 0-28.5-11.5T128 168t11.5-28.5T168 128t28.5 11.5T208 168t-11.5 28.5T168 208zm222 221q17 0 28-11t11-28v-73l-72-36-65 65 16 10q12 7 12 22 0 10-7.5 17.5T294 403q-8 0-13-4l-85-53-77 83h271z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/background";
export { pathData, ltr, accData };