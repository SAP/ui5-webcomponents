import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "binary";
const pathData = "M396 231c-62 0-114-52-114-115C282 52 334 0 396 0c64 0 116 52 116 116 0 63-52 115-116 115zm-191-52c14 0 26 12 26 26s-12 26-26 26H51c-14 0-25-12-25-26s11-26 25-26h51V51H77c-14 0-26-11-26-25C51 11 63 0 77 0h51c14 0 26 11 26 26v153h51zM396 51c-34 0-63 29-63 65 0 35 29 63 63 63 36 0 65-28 65-63 0-36-29-65-65-65zM115 282c64 0 116 52 116 115s-52 115-116 115C52 512 0 460 0 397s52-115 115-115zm346 179c14 0 26 11 26 26 0 14-12 25-26 25H307c-14 0-25-11-25-25 0-15 11-26 25-26h52V333h-26c-14 0-26-11-26-26 0-14 12-25 26-25h51c14 0 26 11 26 25v154h51zm-346 0c35 0 64-29 64-64s-29-64-64-64-64 29-64 64 29 64 64 64z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/binary";
export { pathData, ltr, accData };