import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map-all-fields";
const pathData = "M0 64q0-14 9-23t23-9h448q14 0 23 9t9 23-9 23-23 9H32q-13 0-22.5-9.5T0 64zm0 160q0-14 9-23t23-9h448q14 0 23 9t9 23-9 23-23 9H32q-13 0-22.5-9.5T0 224zm192 288l86-224h32l92 224h-34l-26-68h-94l-25 68h-31zm141-92l-40-108-36 108h76zM32 352h160v64H32q-13 0-22.5-9.5T0 384q0-14 9-23t23-9zm381 157V352h19v56q14-15 32-15 26 0 37 18t11 40q0 23-11.5 42T463 512q-20 0-32-17v14h-18zm18-57q0 15 6 29.5t24 14.5 24.5-15 6.5-29q0-16-6.5-29.5T462 409q-14 0-22 11-9 10-9 32z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/map-all-fields";
export { pathData, ltr, accData };