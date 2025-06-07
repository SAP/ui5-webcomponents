import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "float";
const pathData = "M142 426c16 0 29 12 29 28s-13 29-29 29H28c-15 0-28-13-28-29s13-28 28-28h29V84H28C13 84 0 72 0 55c0-15 13-28 28-28h57c16 0 29 13 29 28v371h28zm341-143h-85v143h85c16 0 29 12 29 28s-13 29-29 29H370c-16 0-29-13-29-29V255c0-16 13-29 29-29h85V84h-85c-16 0-29-12-29-29 0-15 13-28 29-28h113c16 0 29 13 29 28v200c0 16-13 28-29 28zm-227 86c16 0 28 12 28 28v86c0 15-12 28-28 28-15 0-29-13-29-28v-86c0-16 14-28 29-28z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/float";
export { pathData, ltr, accData };