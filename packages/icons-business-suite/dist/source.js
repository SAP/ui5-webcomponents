import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "source";
const pathData = "M255 37l110 147h-73v181h-74V184h-72zM1 308h70v107q0 15 10 25t25 10h299q15 0 25.5-10t10.5-25V308h70v202H1V308z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "source";
export { pathData, ltr, accData };