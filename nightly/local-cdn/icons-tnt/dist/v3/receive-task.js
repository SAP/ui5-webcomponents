import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "receive-task";
const pathData = "M434.5 480h-357c-43 0-77-34-77-77V148c0-43 34-77 77-77h357c43 0 77 34 77 77v255c0 43-34 77-77 77zm0-357h-357c-5 0-9 1-12 3l176 110c7 5 20 5 26 0l177-110c1 0 1 0 2-1-4-1-7-2-12-2zm-180 169c-14 0-28-5-41-13l-161-100v224c0 14 11 27 25 27h357c15 0 27-13 27-27V177l-166 102c-12 7-26 13-41 13z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/receive-task";
export { pathData, ltr, accData };