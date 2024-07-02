import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "user";
const pathData = "M448 512H64V384c0-70 57-128 128-128h64c-71 0-128-57-128-128C128 58 185 0 256 0c70 0 128 58 128 128 0 71-58 128-128 128h64c70 0 128 58 128 128v128zM160 128c0 53 43 96 96 96s96-43 96-96-43-96-96-96-96 43-96 96zM96 384v96h320v-96c0-53-43-96-96-96H192c-53 0-96 43-96 96z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/user";
export { pathData, ltr, accData };