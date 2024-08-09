import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "hint";
const pathData = "M207 80q0-20 14-34t34-14 34 14 14 34-14 34-34 14-34-14-14-34zm-15 369h33V225h-32v-34h95v258h32v31H192v-31z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/hint";
export { pathData, ltr, accData };