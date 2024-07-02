import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "progress-group";
const pathData = "M64 32h384c17 0 32 15 32 32v384c0 19-15 33-32 33H64c-19 0-33-14-33-33V64c0-17 14-32 33-32zm384 416V64H64v384h384zM348 168l63 76c3 5 5 9 5 13s-2 8-5 11l-63 77c-5 5-10 7-16 7H106c-4 0-7-2-9-5-1-1-2-3-2-4 0-2 1-4 3-6l57-69c3-3 5-7 5-11s-2-8-5-13l-57-68c-2-2-3-4-3-6 0-1 1-3 2-4 2-4 5-6 9-6h226c5 0 11 3 16 8zm-22 152l53-64-53-64H153l27 32c8 10 12 21 12 33s-4 23-13 33l-26 30h173z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/progress-group";
export { pathData, ltr, accData };