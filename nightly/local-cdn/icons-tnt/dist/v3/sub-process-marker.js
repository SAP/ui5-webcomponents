import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sub-process-marker";
const pathData = "M32 448V64c0-17 13-32 32-32h384c17 0 32 15 32 32v384c0 19-15 32-32 32H64c-19 0-32-13-32-32zm32 0h384V64H64v384zm64-208h112V128h32v112h112v32H272v112h-32V272H128v-32z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/sub-process-marker";
export { pathData, ltr, accData };