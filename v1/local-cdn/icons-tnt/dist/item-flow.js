import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/item-flow.js";
import { pathData as pathDatav3 } from "./v3/item-flow.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/item-flow";
export { pathData, ltr, accData };