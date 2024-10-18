import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "switch";
const pathData = "M0 400v-96c0-21 13-38 32-45 5-2 11-3 16-3h16v-32H32v-32h64v64h32v-96H32v-32h128v128h192V128h128v32h-96v96h80c25 0 48 23 48 48v96c0 27-21 48-48 48H48c-27 0-48-21-48-48zm371 17h9c11 0 20-9 20-20v-89c0-11-9-20-20-20h-9c-11 0-19 9-19 20v89c0 11 8 20 19 20zm61-109v89c0 11 8 20 19 20h9c11 0 20-9 20-20v-89c0-11-9-20-20-20h-9c-11 0-19 9-19 20zM291 417h9c11 0 20-9 20-20v-89c0-11-9-20-20-20h-9c-11 0-19 9-19 20v89c0 11 8 20 19 20zM112 308v89c0 11 8 20 19 20h9c11 0 20-9 20-20v-89c0-11-9-20-20-20h-9c-11 0-19 9-19 20zm80 0v89c0 11 8 20 19 20h9c11 0 20-9 20-20v-89c0-11-9-20-20-20h-9c-11 0-19 9-19 20zm-160 0v89c0 11 8 20 19 20h9c11 0 20-9 20-20v-89c0-11-9-20-20-20h-9c-11 0-19 9-19 20z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/switch";
export { pathData, ltr, accData };