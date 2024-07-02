import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map-all-fields";
const pathData = "M0 64c0-19 13-32 32-32h448c19 0 32 13 32 32s-13 32-32 32H32C15 96 0 81 0 64zm0 160c0-19 13-32 32-32h448c19 0 32 13 32 32s-13 32-32 32H32c-17 0-32-15-32-32zm223 288h-31l86-224h32l92 224h-34l-26-68h-94zm34-92h76l-40-108zM32 352h160v64H32c-17 0-32-15-32-32 0-19 13-32 32-32zm399 157h-18V352h19v56c9-10 20-15 32-15 35 0 48 29 48 58 0 31-14 61-49 61-13 0-24-6-32-17v14zm0-57c0 20 6 44 30 44s31-25 31-44c0-21-7-43-30-43-9 0-17 4-22 11-6 7-9 17-9 32z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/map-all-fields";
export { pathData, ltr, accData };