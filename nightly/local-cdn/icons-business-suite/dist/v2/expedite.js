import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expedite";
const pathData = "M41.5 115c0-36 28-64 64-64h64V23c0-12 10-22 22-22s21 10 21 22v28h86V23c0-12 9-22 21-22s21 10 21 22v28h66c36 0 64 28 64 64v301c0 36-28 64-64 64h-301c-36 0-64-28-64-64V115zm43 0v301c0 12 9 21 21 21h301c12 0 21-9 21-21V115c0-12-9-21-21-21h-66v29c0 12-9 21-21 21s-21-9-21-21V94h-86v29c0 12-9 21-21 21s-22-9-22-21V94h-64c-12 0-21 9-21 21zm53 159c-1-2-1-5-1-8 0-5 0-8 1-9l4-4c0-1 1-2 2-3l73-73c4-5 10-7 16-7 5 0 11 2 15 7 8 8 8 22 0 30l-38 38h144c12 0 21 9 21 21s-9 21-21 21h-144l38 38c8 8 8 21 0 29-5 5-10 7-15 7-6 0-11-2-16-7l-73-73c-1-1-2-2-2-3-1-1-1-3-4-4z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/expedite";
export { pathData, ltr, accData };