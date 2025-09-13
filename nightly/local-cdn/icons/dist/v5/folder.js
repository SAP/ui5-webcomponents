import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "folder";
const pathData = "M422 480H90q-38 0-64-26T0 390V122q0-38 26-64t64-26h115q9 0 18 7l44 44h155q38 0 64 26t26 63v218q0 38-26 64t-64 26zM90 83q-17 0-28 11t-11 28v268q0 17 11 28t28 11h332q17 0 28-11t11-28V172q0-16-11-27t-28-11H256q-9 0-18-7l-44-44H90zm38 173q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm262 0H250q-11 0-18.5-7.5T224 230t7.5-18 18.5-7h140q11 0 18.5 7t7.5 18-7.5 18.5T390 256zm-262 96q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm262 0H250q-11 0-18.5-7.5T224 326t7.5-18 18.5-7h140q11 0 18.5 7t7.5 18-7.5 18.5T390 352z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/folder";
export { pathData, ltr, accData };