import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "uuid";
const pathData = "M487 0c14 0 25 11 25 26v90c0 63-52 115-116 115-62 0-114-52-114-115V26c0-15 11-26 25-26 15 0 26 11 26 26v90c0 35 29 63 63 63 36 0 65-28 65-63V26c0-15 11-26 26-26zM115 231C52 231 0 179 0 116V26C0 11 11 0 26 0c14 0 25 11 25 26v90c0 35 29 63 64 63s64-28 64-63V26c0-15 12-26 26-26s26 11 26 26v90c0 63-52 115-116 115zm116 102h-77v128h77c14 0 25 11 25 26 0 14-11 25-25 25H26c-15 0-26-11-26-25 0-15 11-26 26-26h76V333H26c-15 0-26-11-26-26 0-14 11-25 26-25h205c14 0 25 11 25 25 0 15-11 26-25 26zm194-51c48 0 87 39 87 87v56c0 49-39 87-87 87H282V282h143zm36 143v-56c0-20-16-36-36-36h-92v128h92c20 0 36-16 36-36z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/uuid";
export { pathData, ltr, accData };