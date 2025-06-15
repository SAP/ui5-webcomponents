import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow";
const pathData = "M72 507c-16 0-33-6-45-18-25-25-25-65 0-90L401 25c13-13 29-19 45-19s32 6 44 19c25 25 25 65 0 90L117 489c-13 12-29 18-45 18zm374-107c-36 0-64-28-64-63V134H179c-35 0-64-29-64-64s29-63 64-63h267c34 0 63 28 63 63v267c0 35-29 63-63 63z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/arrow";
export { pathData, ltr, accData };