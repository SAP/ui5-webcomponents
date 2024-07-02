import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/sub-process-marker.js";
import { pathData as pathDatav3 } from "./v3/sub-process-marker.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/sub-process-marker";
export { pathData, ltr, accData };