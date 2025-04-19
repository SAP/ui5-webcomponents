import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "receptions";
const pathData = "M485 6q5-5 11-5t11 5 5 11-5 11L247 289h89q16 0 16 16t-16 16H209q-16 0-16-16V175q0-6 4.5-10t11.5-4q6 0 11 5t5 11v89zm11 91q6 0 11 4.5t5 11.5v283q0 10-6 18t-15 12l-224 85q-6 2-11 2-4 0-12-2L21 426q-21-8-21-30V118q0-22 21-30L245 3q3-1 5.5-1.5T256 1q5 0 11 2l91 35q14 5 17 10t3 9q0 2-1 5-5 10-15 10-3 0-7-1t-9-3l-90-35-224 85v278l224 85 224-85V113q0-14 16-16z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/receptions";
export { pathData, ltr, accData };