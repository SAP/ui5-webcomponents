import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/system-hana.js";
import { pathData as pathDatav3 } from "./v3/system-hana.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/system-hana";
export { pathData, ltr, accData };