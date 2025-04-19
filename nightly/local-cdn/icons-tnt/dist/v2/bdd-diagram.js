import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bdd-diagram";
const pathData = "M480 192q13 0 22.5 9t9.5 23v64q0 14-9.5 23t-22.5 9h-65q-13 0-22-9t-9-23v-16h-64l-1 80q0 3-2 7l27 27q4-2 7-2h65q13 0 22.5 9t9.5 23v64q0 14-9.5 23t-22.5 9h-65q-13 0-22-9t-9-23v-64q0-5 1-8l-34-34-119 41q-3 1-8 1-6 0-9-1L10 367q-10-3-10-15V160q0-12 10-15l141-48q3-1 9-1 5 0 8 1l119 41 34-34q-1-3-1-8V32q0-14 9-23t22-9h65q13 0 22.5 9t9.5 23v64q0 14-9.5 23t-22.5 9h-65q-3 0-7-2l-27 27q1 2 2 3.5t1 3.5v80h64v-16q0-14 9-23t22-9h65zM351 32l1 64h64V32h-65zM251 159l-91-31-92 31 92 31zm-107 59L31 180v161l113 38V218zm144-38l-113 38v161l113-38V180zm192 108v-64h-65l1 64h64zm-64 128h-65l1 64h64v-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/bdd-diagram";
export { pathData, ltr, accData };