import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "application";
const pathData = "M32 439V73c0-23 17-41 40-41h367c23 0 41 18 41 41v366c0 23-18 41-41 41H72c-23 0-40-18-40-41zm32-311h384V73c0-6-3-9-9-9H72c-5 0-8 3-8 9v55zm304-48h32c11 0 16 5 16 16s-5 16-16 16h-32c-11 0-16-5-16-16s5-16 16-16zm80 80H64v279c0 6 3 9 8 9h367c6 0 9-3 9-9V160zM96 192h224v160H96V192zm32 32v96h160v-96H128z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/application";
export { pathData, ltr, accData };