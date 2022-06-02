import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text";
const pathData = "M466 1q14 0 22 8t8 22v60q0 14-8 22t-22 8-22-8-8-22V61H286v360h30q14 0 22 8t8 22-8 22-22 8H196q-14 0-22-8t-8-22 8-22 22-8h30V61H76v30q0 14-8 22t-22 8-22-8-8-22V31q0-14 8-22t22-8h420z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "text";
export { pathData, ltr, accData };