import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "create-dashboard";
const pathData = "M120 0h288v109h-32V32H152v96H56v352h320v-78h32v110H24V96zm224 237h48v-48h48v48h48v48h-48v48h-48v-48h-48v-48zM88 256v-37h224v37H88zm224 36v37H88v-37h224zM88 402v-37h224v37H88z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "create-dashboard";
export { pathData, ltr, accData };