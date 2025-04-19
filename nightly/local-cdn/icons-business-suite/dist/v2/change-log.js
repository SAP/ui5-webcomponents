import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "change-log";
const pathData = "M3 178V78C3 35 36 1 79 1h355c43 0 77 34 77 77v203c0 43-34 76-77 76h-50c-13 0-25-12-25-25 0-15 12-26 25-26h50c15 0 26-12 26-25V78c0-15-11-26-26-26H79c-15 0-26 11-26 26v100c0 13-11 25-24 25-15 0-26-12-26-25zm370 54V116c0-15 10-24 25-24s26 9 26 24v116c0 15-11 25-26 25s-25-10-25-25zm-79 0V116c0-15 11-24 26-24 13 0 25 9 25 24v116c0 15-12 25-25 25-15 0-26-10-26-25zm-79-55v-61c0-15 11-24 26-24s25 9 25 24v61c0 13-10 25-25 25s-26-12-26-25zM1 358c0-84 69-151 153-151 85 0 153 67 153 151s-68 152-153 152C70 510 1 442 1 358zm256 0c0-55-47-100-103-100S52 303 52 358s46 101 102 101 103-46 103-101zm-78-29h27c15 0 26 11 26 26s-11 25-26 25h-52c-15 0-26-10-26-25v-48c0-15 11-25 26-25s25 10 25 25v22z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/change-log";
export { pathData, ltr, accData };