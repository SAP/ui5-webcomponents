import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "firewall";
const pathData = "M192 160V96h160v64H192zM0 96h160v64H0V96zm512 0v64H384V96h128zm-96 160H256v-64h160v64zM64 192h160v64H64v-64zm384 0h64v64h-64v-64zM0 192h32v64H0v-64zm0 97h160v63H0v-63zm192 0h160v63H192v-63zm192 0h128v63H384v-63zm64 95v64H288v-64h160zm-192 0v64H96v-64h160zM0 384h64v64H0v-64zm480 0h32v64h-32v-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/firewall";
export { pathData, ltr, accData };