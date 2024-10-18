import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "actor";
const pathData = "M255 140c-39 0-69-31-69-70s30-70 69-70 71 31 71 70-32 70-71 70zm0-116c-24 0-46 21-46 46s22 47 46 47c27 0 47-22 47-47s-20-46-47-46zm68 103l72-55c6-4 13-6 21-6 21 0 41 16 41 39v5c-1 9-6 17-15 24l-100 76c-5 5-7 10-7 15v250c0 20-15 37-38 37-20 0-37-17-37-37V352h-8v123c0 20-17 37-37 37-23 0-38-17-38-37V225c0-20-86-76-107-91-16-12-15-24-15-29 0-14 13-41 40-41 9 0 16 3 22 8l107 80h64zm-31 51h-68c-6 0-11-3-123-86-3-3-7-4-11-4-12 0-13 10-13 13 0 5 3 9 8 13l100 75c11 9 17 21 17 36v250c0 7 4 11 13 11 7 0 12-4 12-11V347c0-13 7-20 20-20h18c13 0 20 7 20 20v128c0 7 5 11 12 11 9 0 13-4 13-11V225c0-15 6-27 17-36l100-75c5-3 7-7 7-11 0-3-1-13-14-13-4 0-7 1-9 2l-94 71c-1 1-2 1-3 2l-1 1c-13 9-16 12-21 12z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/actor";
export { pathData, ltr, accData };