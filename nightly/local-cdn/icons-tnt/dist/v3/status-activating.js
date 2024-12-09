import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-activating";
const pathData = "M464 32v192c-27-20-60-32-96-32-88 0-160 72-160 160 0 36 12 69 32 96H48c-19 0-32-13-32-32V32C16 13 29 0 48 0h384c19 0 32 13 32 32zm-95 448c-72 0-129-60-129-128 0-70 58-128 128-128 68 0 128 57 128 129 0 69-57 127-127 127zm0-224c-55 0-97 41-97 96 0 52 41 96 96 96 53 0 96-41 96-96s-42-96-95-96zm47 128h-64v-80c0-11 5-16 16-16s16 5 16 16v48h32c11 0 16 5 16 16s-5 16-16 16z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/status-activating";
export { pathData, ltr, accData };