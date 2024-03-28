import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "workflow-editor";
const pathData = "M0 80C0 36 36 0 80 0s80 36 80 80-36 80-80 80S0 124 0 80zm224 16h-45V64h77v128h51v-19c0-15 11-25 26-25h153c15 0 26 10 26 25v154c0 15-11 25-26 25H333c-15 0-26-10-26-25V224h-83V96zm134 205h103V199H358v102zm-134-13v-32h32v32h-32zm0 32h32v32h-32v-32zM10 358h133c7 0 11 4 11 11v47h22v32h-22v54c0 7-4 10-11 10H10c-7 0-10-3-10-10V369c0-7 3-11 10-11zm182 90v-32h32v-32h32v64h-64z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/workflow-editor";
export { pathData, ltr, accData };