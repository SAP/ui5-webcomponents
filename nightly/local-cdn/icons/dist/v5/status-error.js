import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-error";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm45 256l74-73q9-11 9-23 0-13-9.5-22.5T352 128q-12 0-23 9l-73 74-73-74q-10-9-23-9t-22.5 9.5T128 160q0 12 9 23l74 73-74 73q-9 10-9 23t9.5 22.5T160 384t23-9l73-74 73 74q11 9 23 9 13 0 22.5-9.5T384 352t-9-23z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/status-error";
export { pathData, ltr, accData };