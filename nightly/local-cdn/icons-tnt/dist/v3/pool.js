import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pool";
const pathData = "M112 0h288c17 0 32 15 32 32v448c0 19-15 32-32 32H112c-19 0-32-13-32-32V32c0-17 13-32 32-32zm160 64v416h128V64H272zm-160 0v416h128V64H112z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/pool";
export { pathData, ltr, accData };