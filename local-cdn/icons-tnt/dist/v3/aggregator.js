import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "aggregator";
const pathData = "M32 288v-64c0-19 13-32 32-32h64c19 0 32 15 32 32v16h64V128c0-17-13-32-32-32h-32v32c0 17-15 32-32 32H64c-17 0-32-13-32-32V64c0-19 13-32 32-32h64c19 0 32 15 32 32h32c35 0 64 29 64 64v112h64v-80c0-19 13-32 32-32h96c19 0 32 15 32 32v192c0 17-15 32-32 32h-96c-17 0-32-13-32-32v-80h-64v112c0 35-29 64-64 64h-32c0 17-15 32-32 32H64c-17 0-32-13-32-32v-64c0-19 13-32 32-32h64c19 0 32 15 32 32v32h32c19 0 32-15 32-32V272h-64v16c0 17-15 32-32 32H64c-17 0-32-13-32-32zm32-160h64V64H64v64zm64 96H64v64h64v-64zm0 160H64v64h64v-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/aggregator";
export { pathData, ltr, accData };