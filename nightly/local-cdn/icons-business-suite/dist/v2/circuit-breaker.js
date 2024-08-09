import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "circuit-breaker";
const pathData = "M376.5 408V73c0-13-11-24-24-24h-72v88l59 90c6 11 4 27-7 34-4 2-10 4-14 4-8 0-16-4-20-11l-62-96c-3-4-5-10-5-14V49h-72c-13 0-24 11-24 24v335c0 13 11 24 24 24h72v-95c0-14 11-24 25-24 13 0 24 10 24 24v95h72c13 0 24-11 24-24zM159.5 1h193c40 0 72 32 72 72v335c0 40-32 72-72 72h-193c-40 0-72-32-72-72V73c0-40 32-72 72-72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/circuit-breaker";
export { pathData, ltr, accData };