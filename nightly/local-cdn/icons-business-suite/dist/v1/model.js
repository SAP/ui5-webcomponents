import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "model";
const pathData = "M64 96l96-96h288v512H64V96zm32 32v352h320V32H192v96H96zm37 288v-83h70l16-14h7v-8h-12v-36h-15v-96c0-15 18-28 57-28s57 13 57 28v96h-16v36h-11v8h6l17 14h69v83h-69l-17 15h-73l-16-15h-70zm76-67h-60v51h60l16 15h61l17-15h59v-51h-59l-17-14h-16v-40h11v-36h16v-80c0-4-16-12-41-12s-41 8-42 12v80h16v36h12v40h-17zm63-161h11v62h-11v-62zm-22 0h11v62h-11v-62zm-22 62v-62h11v62h-11z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/model";
export { pathData, ltr, accData };