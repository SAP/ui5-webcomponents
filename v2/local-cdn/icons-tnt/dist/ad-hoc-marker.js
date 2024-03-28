import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/ad-hoc-marker.js";
import { pathData as pathDatav3 } from "./v3/ad-hoc-marker.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/ad-hoc-marker";
export { pathData, ltr, accData };