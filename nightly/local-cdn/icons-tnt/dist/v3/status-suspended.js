import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-suspended";
const pathData = "M461-1c28 0 51 23 51 51v410c0 28-23 51-51 51H51c-28 0-51-23-51-51V50C0 22 23-1 51-1h410zM359 344V165c0-21-18-38-39-38s-38 17-38 38v179c0 22 17 39 38 39s39-17 39-39zm-141 0V165c0-21-17-38-38-38s-39 17-39 38v179c0 22 18 39 39 39s38-17 38-39z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/status-suspended";
export { pathData, ltr, accData };