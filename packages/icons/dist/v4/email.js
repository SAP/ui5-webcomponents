import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "email";
const pathData = "M480 96q14 0 23 9t9 23v320q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 448V128q0-14 9.5-23T32 96h448zM64 128l192 160 192-160H64zm416 16L256 320 32 144v288l133-136 19 18L48 448h416L329 314l17-18 134 136V144z";
const ltr = false;
const accData = null;
const collection = "SAP-icons";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "email";
export { pathData, ltr, accData };