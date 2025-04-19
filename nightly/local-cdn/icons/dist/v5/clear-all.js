import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "clear-all";
const pathData = "M346 192q-11 0-18.5-7.5T320 166q0-10 8-18l36-36-36-36q-8-8-8-18 0-11 7.5-18.5T346 32t18 7l36 37 36-37q7-7 18-7t18.5 7.5T480 58t-7 18l-37 36 37 36q7 7 7 18t-7.5 18.5T454 192q-10 0-18-8l-36-36-36 36q-8 8-18 8zm108 64q11 0 18.5 7.5T480 282v108q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h108q11 0 18.5 7.5T256 58t-7.5 18-18.5 7H122q-17 0-28 11t-11 28v268q0 17 11 28t28 11h268q16 0 27.5-11t11.5-28V282q0-11 7-18.5t18-7.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/clear-all";
export { pathData, ltr, accData };