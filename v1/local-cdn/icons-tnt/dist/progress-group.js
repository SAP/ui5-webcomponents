import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/progress-group.js";
import { pathData as pathDatav3 } from "./v3/progress-group.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/progress-group";
export { pathData, ltr, accData };