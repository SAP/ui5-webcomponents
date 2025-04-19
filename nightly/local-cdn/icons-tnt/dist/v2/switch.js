import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "switch";
const pathData = "M0 400v-96q0-16 9-28t23-17q8-3 16-3h16v-32H32v-32h64v64h32v-96H32v-32h128v128h192V128h128v32h-96v96h80q19 0 33.5 14.5T512 304v96q0 20-14 34t-34 14H48q-20 0-34-14T0 400zm371 17h9q8 0 14-6t6-14v-89q0-8-6-14t-14-6h-9q-8 0-13.5 6t-5.5 14v89q0 8 5.5 14t13.5 6zm61-20q0 8 5.5 14t13.5 6h9q8 0 14-6t6-14v-89q0-8-6-14t-14-6h-9q-8 0-13.5 6t-5.5 14v89zm-141 20h9q8 0 14-6t6-14v-89q0-8-6-14t-14-6h-9q-8 0-13.5 6t-5.5 14v89q0 8 5.5 14t13.5 6zM112 308v89q0 8 5.5 14t13.5 6h9q8 0 14-6t6-14v-89q0-8-6-14t-14-6h-9q-8 0-13.5 6t-5.5 14zm80 89q0 8 5.5 14t13.5 6h9q8 0 14-6t6-14v-89q0-8-6-14t-14-6h-9q-8 0-13.5 6t-5.5 14v89zM32 308v89q0 8 5.5 14t13.5 6h9q8 0 14-6t6-14v-89q0-8-6-14t-14-6h-9q-8 0-13.5 6T32 308z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/switch";
export { pathData, ltr, accData };