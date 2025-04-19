import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "value-mapping";
const pathData = "M346 300v30h120V180H316V0h180v480H316V300h30zM16 0h180v210h-30v-30H46v150h150v150H16V0zm30 150h120V60H46v90zm300-90v90h120V60H346zM196 312l-90-72h210v-40l90 70H196v42zM46 360v90h120v-90H46zm300 90h120v-90H346v90z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/value-mapping";
export { pathData, ltr, accData };