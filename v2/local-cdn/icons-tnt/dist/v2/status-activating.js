import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-activating";
const pathData = "M389 210q-35 0-66.5 12.5t-55.5 35-39 53-17 66.5q-2 30 6.5 58.5T242 487H49q-20 0-34-14.5T1 438V49q0-20 14-34.5T49 0h390q20 0 34.5 14.5T488 49v193q-44-32-99-32zm0 264q17 0 32.5-6.5t26.5-18 17.5-26.5 6.5-33q0-34-24-58.5T389 307q-34 0-58.5 24.5T306 390q0 18 6.5 33t18 26.5 26.5 18 32 6.5zm0-205q25 0 47.5 9.5t39 26 26 38.5 9.5 47-9.5 47.5-26 39-39 26T389 512t-47.5-9.5-39-26-26-39T267 390t9.5-47 26-38.5 39-26T389 269zm39 109q8 0 13.5 5.5T447 397t-5.5 13.5T428 416h-39q-8 0-13.5-5.5T370 397v-51q0-8 5.5-13.5T389 327t14 5.5 6 13.5v32h19z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/status-activating";
export { pathData, ltr, accData };