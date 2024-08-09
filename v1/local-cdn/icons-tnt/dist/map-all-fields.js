import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/map-all-fields.js";
import { pathData as pathDatav3 } from "./v3/map-all-fields.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/map-all-fields";
export { pathData, ltr, accData };