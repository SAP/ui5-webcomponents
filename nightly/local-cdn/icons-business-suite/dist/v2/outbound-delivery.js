import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "outbound-delivery";
const pathData = "M308.5 250V122c0-13-11-26-24-26-17 0-26-8-26-25s8-25 25-25c32 0 62 19 71 50h84c11 0 21 5 24 16l47 124c3 5 1 9 2 14v50c0 35-23 67-56 74 3 7 7 17 7 28 0 44-36 77-81 76-35-3-65-30-72-65-3-16 2-26 5-37h-112c4 11 7 21 4 37-7 35-37 62-72 65-45 1-79-32-79-76 0-11 2-20 5-28-33-7-56-39-56-74 0-17 8-26 25-26 16 0 26 11 26 27 0 13 11 24 24 24h357c15 0 26-10 26-25v-26h-128c-15 0-26-11-26-24zm-166-77h-116c-17 0-26-8-26-24 0-17 9-26 26-26h116l-32-33c-11-9-11-25 0-36 9-11 24-11 35 0l77 76c9 11 9 25 0 36l-77 77c-11 9-26 9-35 0-11-11-11-25 0-36zm304 51l-32-76h-55v76h87zm-316 210c15 0 28-12 28-27s-13-27-28-27-26 12-26 27 11 27 26 27zm282-27c0-15-12-27-27-27s-28 12-28 27 13 27 28 27 27-12 27-27z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/outbound-delivery";
export { pathData, ltr, accData };