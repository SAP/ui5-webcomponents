import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "throwing-message";
const pathData = "M256 512C115 512 0 397 0 255 0 114 115 0 256 0s256 114 256 255c0 142-115 257-256 257zm0-461C143 51 51 143 51 255c0 114 92 205 205 205s205-91 205-205c0-112-92-204-205-204zm0 383c-99 0-179-80-179-179 0-98 80-178 179-178s179 80 179 178c0 99-80 179-179 179zm0-306c-72 0-128 55-128 127 0 73 56 128 128 128s128-55 128-128c0-72-56-127-128-127zm52 79l-49 30c-2 1-4 1-7 0l-65-42c5-5 12-9 19-9h100c7 0 14 4 19 9zm-40 44l65-40v74c0 15-12 26-27 26H206c-14 0-27-11-27-26v-71c0-1 1-2 1-3l14 10 49 30c4 2 9 4 13 4s8-2 12-4z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/throwing-message";
export { pathData, ltr, accData };