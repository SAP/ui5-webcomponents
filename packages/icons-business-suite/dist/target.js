import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "target";
const pathData = "M256 365L146 218h73V37h74v181h72zM1 510V308h70v107q0 15 10 25t25 10h299q15 0 25.5-10t10.5-25V308h70v202H1z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "target";
export { pathData, ltr, accData };