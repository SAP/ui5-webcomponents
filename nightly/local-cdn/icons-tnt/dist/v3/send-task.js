import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "send-task";
const pathData = "M263 231c-5 3-13 3-19 0L24 91c16-17 39-28 65-28h332c26 0 49 11 65 27l-59 39zm195-54l52-34s0 1 1 2v245c0 49-40 91-90 91H89c-50 0-90-42-90-91V153c0-3 1-5 1-9l51 33 163 102c12 8 26 12 40 12s28-4 40-12z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/send-task";
export { pathData, ltr, accData };