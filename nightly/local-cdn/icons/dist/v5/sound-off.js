import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sound-off";
const pathData = "M262 64q11 0 18.5 7.5T288 90v332q0 11-7.5 18.5T262 448q-7 0-14-5l-128-91H26q-11 0-18.5-7.5T0 326V186q0-11 7.5-18.5T26 160h94l128-91q7-5 14-5zm-25 75l-94 67q-7 5-15 5H51v90h77q10 0 15 5l94 67V139zm268 172q7 7 7 17 0 11-7.5 18.5T486 354q-10 0-18-8l-51-53-53 55q-8 8-18 8-11 0-18.5-7.5T320 330q0-10 7-17l55-57-55-57q-7-7-7-17 0-11 7.5-18.5T346 156q10 0 18 8l53 55 51-53q8-8 18-8 11 0 18.5 7.5T512 184q0 10-7 17l-53 55z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sound-off";
export { pathData, ltr, accData };