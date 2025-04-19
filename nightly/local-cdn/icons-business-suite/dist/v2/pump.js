import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pump";
const pathData = "M453.5 216v-49c0-13-11-25-24-25h-104c-7 0-12-2-17-7-30-29-64-43-103-43-82 0-149 67-149 150 0 82 67 149 149 149 83 0 150-67 150-149 0-27-22-64 10-74 15-4 27 3 31 16 5 20 8 39 8 58h25c13 0 24-11 24-26zm-118-124h94c41 0 75 34 75 75v49c0 43-34 75-75 75h-32c-21 84-100 149-192 149-109 0-198-89-198-198 0-110 89-199 198-199 47 0 91 18 130 49z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/pump";
export { pathData, ltr, accData };