import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "where-used";
const pathData = "M242 137l85-85h-41V16h99v103h-34V77l-84 86zm-46 32v174H23V169h173zm229 104H244v-34h181l-30-30 24-24 73 73-71 70-25-25zm-262 36V202H56v107h107zm104 39l84 86v-42h34v103h-99v-36h41l-85-85z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "where-used";
export { pathData, ltr, accData };