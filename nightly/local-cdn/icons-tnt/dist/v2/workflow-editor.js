import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "workflow-editor";
const pathData = "M0 80q0-33 23.5-56.5T80 0t56.5 23.5T160 80t-23.5 56.5T80 160t-56.5-23.5T0 80zm179 16V64h77v128h51v-19q0-11 7.5-18t18.5-7h153q11 0 18.5 7t7.5 18v154q0 11-7.5 18t-18.5 7H333q-11 0-18.5-7t-7.5-18V224h-83V96h-45zm282 205V199H358v102h103zm-237-45h32v32h-32v-32zm32 64v32h-32v-32h32zM10 358h133q11 0 11 11v47h22v32h-22v54q0 10-11 10H10q-10 0-10-10V369q0-11 10-11zm182 58h32v-32h32v64h-64v-32z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/workflow-editor";
export { pathData, ltr, accData };