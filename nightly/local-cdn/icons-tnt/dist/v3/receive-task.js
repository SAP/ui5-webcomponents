import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "receive-task";
const pathData = "M32 96h448c19 0 32 13 32 32v320c0 17-13 32-32 32H32c-17 0-32-15-32-32V128c0-19 15-32 32-32zm414 32H66l190 154zm34 296V144L256 324 32 144v280l131-131 24 24L56 448h401L326 317l23-24z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/receive-task";
export { pathData, ltr, accData };