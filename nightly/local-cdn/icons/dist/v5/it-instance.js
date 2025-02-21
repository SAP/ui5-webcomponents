import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "it-instance";
const pathData = "M154 51q-17 0-28 11t-11 28v332q0 17 11 28t28 11h204q17 0 28-11t11-28V90q0-17-11-28t-28-11H154zm204 461H154q-38 0-64-26t-26-64V90q0-38 26-64t64-26h204q38 0 64 26t26 64v332q0 38-26 64t-64 26zm-32-96H186q-11 0-18.5-7.5T160 390t7.5-18 18.5-7h140q11 0 18.5 7t7.5 18-7.5 18.5T326 416zm13-333q13 0 21 8t8 21-8 21-21 8-21-8-8-21 8-21 21-8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/it-instance";
export { pathData, ltr, accData };