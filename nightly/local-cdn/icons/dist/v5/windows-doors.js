import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "windows-doors";
const pathData = "M209 64q11 0 18.5 7.5T235 90v332q0 11-7.5 18.5T209 448H26q-11 0-18.5-7.5T0 422V90q0-11 7.5-18.5T26 64h183zm-72 204q-23 0-23-22t23-22 23 22-23 22zM486 64q11 0 18.5 7.5T512 90v176q0 11-7.5 18.5T486 292H303q-11 0-18.5-7.5T277 266V90q0-11 7.5-18.5T303 64h183zm-302 51H51v282h133V115zm144 126h41v-38h-41v38zm0-126v37h41v-37h-41zm133 126v-38h-41v38h41zm0-126h-41v37h41v-37z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/windows-doors";
export { pathData, ltr, accData };