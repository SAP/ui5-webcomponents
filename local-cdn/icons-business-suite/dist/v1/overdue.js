import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "overdue";
const pathData = "M511.5 512H.5V32h97V0h30v32h33V0h31v32h130V0h31v32h33V0h31v32h95v480zm-191-416h32V64h-32v32zm-128-32h-32v32h32V64zm-96 0v32h32V64h-32zm320 0h-32v32h32V64zm64 416V160h-448v320h448zm-240-251h-64v-37h64v37zm-176 0v-37h64v37h-64zm320-37h64v37h-64v-37zm-64 230l-123-102 123-102v64h128v76h-128v64zm-256-67v-90h98v90h-98zm20-71v49h57v-49h-57zm-20 127h64v37h-64v-37zm112 37v-36h64v36h-64zm272 0h-64v-36h64v36z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/overdue";
export { pathData, ltr, accData };